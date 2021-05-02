---
layout: post
title: 'Flextrine Tutorial – CRUD in a simple Flex 4 address book: Creating new entities'
categories:
- AS3
- Tutorial
tags:
- as3 listeners
- association
- bidirectional
- detached
- entitymanager persist
- Flextrine
- flush
- managed
- many to one
- one to many
- onetomany
- persist
- removed
permalink: "/flextrine-tutorial-crud-in-a-simple-flex-4-address-book-creating-new-entities/"
---

- [Introduction]({% post_url 2010-08-03-1-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-introduction %})
- [Setting up the server]({% post_url 2010-08-03-2-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-setting-up-the-server %})
- [Creating the entities]({% post_url 2010-08-03-3-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-creating-the-entities %})
- [Creating the database schema]({% post_url 2010-08-03-4-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-creating-the-database-schema %})
- [Loading the entities]({% post_url 2010-08-03-5-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-loading-the-entities %})
- [Creating new entities]({% post_url 2010-08-03-6-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-creating-new-entities %})
- [Deleting entities]({% post_url 2010-08-03-7-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-deleting-entities %})
- [Updating entities]({% post_url 2010-08-03-8-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-updating-entities %})
- [Conclusion]({% post_url 2010-08-03-9-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-conclusion %})

To add new entities to the repository we use the EntityManager.persist() method.&#160; Let’s link up the **Add group** and **Add contact** buttons and get them to create and persist new entities.

Modify the *Button* MXML tags for **Add Group** and **Add Contact** so that they call addNewGroup() and addNewContact() when they are clicked.&#160; We can only add contacts within a group, so we will also make sure that you can only click addNewContact() if a ContactGroup is selected in the tree.

```mxml
<s:Button label="New group" click="onNewGroupClick()" />
<s:Button label="New contact" click="onNewContactClick()" enabled="{tree.selectedItem is ContactGroup}" />
```

Firstly we’ll make the onNewGroupClick() function.&#160; It really is as simple as creating a new ContactGroup(), assigning some properties and calling EntityManger.persist().

```as3
private function onNewGroupClick():void {
  var contactGroup:ContactGroup = new ContactGroup();
  contactGroup.name = "New group";
  em.persist(contactGroup);

  // Select the new ContactGroup in the tree
  tree.selectedItem = contactGroup;
}
```

And that’s it :)&#160; When the user clicks **Add Group** a new ContactGroup entity is created, a name is assigned to it and it is *persisted* to Flextrine.&#160; This means that the new contactGroup is added to *entities* in the *ContactGroup* entity repository (triggering databinding and updating the tree), and the new entity is marked for insertion into the database.&#160; Note that Flextrine doesn’t actually do anything with the database when we call persist, it just notes that we need to insert it on the next *flush – *we’ll worry about flushing after we have created onNewContactClick().

`onNewContactClick()` is very similar:

```as3
private function onNewContactClick():void {
  var selectedContactGroup:ContactGroup = tree.selectedItem as ContactGroup;
  
  var contact:Contact = new Contact();
  contact.name = "New contact";
  
  contact.contactGroup = selectedContactGroup;
  selectedContactGroup.contacts.addItem(contact);
  
  em.persist(contact);
  
  // Select the new Contact in the tree
  tree.selectedItem = contact;
}
```

There is one important subtlety here.&#160; Just like JPA, Flextrine does **not** automatically handle both ends of a bi-directional association, and its the developer’s job to manage the domain model.&#160; Let’s talk about this in more detail.&#160; Our association between ContactGroup and Contact is *OneToMany bi-directional*.&#160; This means that a ContactGroup has many Contacts, and a Contact has one ContactGroup.&#160; Therefore when we create a new Contact we need to do the following:

- Set *newContact.contactGroup* to *selectedContactGroup*
- Add *newContact* to *selectedContactGroup.contacts*

In this way we maintain both sides of the bi-directional association.&#160; If we were to **change** the contactGroup of an existing contact we would need to add another step:

- Remove *contact* from its current *contactGroup.contacts*
- Set *contact.contactGroup* to *selectedContactGroup*
- Set *newContact.contactGroup* to *selectedContactGroup*

Let’s encapsulate this functionality within Contact and ContactGroup by creating *ContactGroup.addContact*, *ContactGroup.removeContact* and *Contact.setContactGroup*.&#160; These are called **association helpers** and its very likely that future versions of Flextrine will auto-generate these for you.&#160; However, for now we’ll code them by hand.

#### ContactGroup.as

```as3
package vo {
  import mx.collections.ArrayCollection;
  
  [RemoteClass(alias="vo/ContactGroup")]
  [Entity]
  public class ContactGroup extends ContactGroupEntityBase {
  
    public function get children():ArrayCollection {
      return contacts;
    }
    
    public function addContact(contact:Contact):void {
      contact.setContactGroup(this);
    }
    
    public function removeContact(contact:Contact):void {
      contacts.removeItemAt(contacts.getItemIndex(contact));
    }
  
  }
}
```

#### Contact.as

```as3
package vo {
  import mx.collections.ArrayCollection;
  
  [RemoteClass(alias="vo/Contact")]
  [Entity]
  public class Contact extends ContactEntityBase {
  
    public function setContactGroup(contactGroup:ContactGroup):void {
      if (this.contactGroup) this.contactGroup.removeContact(this);
      this.contactGroup = contactGroup;

      if (contactGroup) contactGroup.contacts.addItem(this);
    }
  
  }
}
```

And now we can change `onNewContactClick()` to simply read:

```as3
private function onNewContactClick():void {
  var selectedContactGroup:ContactGroup = tree.selectedItem as ContactGroup;
  
  var contact:Contact = new Contact();
  contact.name = "New contact";
  selectedContactGroup.addContact(contact);
  em.persist(contact);
  
  // Select the new Contact in the tree
  tree.selectedItem = contact;
}
```

These complications are only relevant for bi-directional association.&#160; If, for example, *ContactGroup* has many *Contacts*, but *ContactGroups* don’t know anything about their *Contacts* this would be a ManyToOne uni-directional association and all we would need to do would be to set *contactGroup* on the *Contact* to maintain the domain model.

### Flushing

At this point nothing has actually been written to the database - all that has happened is that Flextrine has marked our persisted objects for insertion.&#160; In order to tell Flextrine to execute its queue of operations against the database we use `EntityManager.flush()`.&#160; This will create new entities, update changed entities and delete removed entities in the database.

One thing to consider is if for some reason the flush fails (for example if we were to try and delete a ContactGroup without deleting its child Contacts) the client will be out of sync with what is in the database so we are going to add a *responder* to `flush()` that will simply reload all the data fresh from the database in case of an error.

Note that once the `flush()` has completely successfully our persisted ContactGroup and Contact entities will have their *id* fields automatically updated with the auto increment id from the database.

Update the **Save** button to call `onSaveClick()`:

```mxml
<s:Button label="Save" click="onSaveClick()" />
```

And implement the method and the responders:

```as3
private function onSaveClick():void {
  enabled = false;

  em.flush().addResponder(new AsyncResponder(onSaveResult, onSaveFault));
}

private function onSaveResult(result:Object, token:Object):void {
  enabled = true;
}

private function onSaveFault(result:Object, token:Object):void {
  enabled = true;
  
  em.clear();
  em.getRepository(ContactGroup).loadAll();
}
```

Notice that if there is an error we call EntityManager.clear() before reloading the data – this empties out all the current entities in the repositories.

In the next section of the tutorial we’ll see how we can [delete entities]({% post_url 2010-08-03-7-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-deleting-entities %}).
