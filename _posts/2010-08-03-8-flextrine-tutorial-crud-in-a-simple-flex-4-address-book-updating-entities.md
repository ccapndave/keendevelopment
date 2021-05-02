---
layout: post
title: 'Flextrine Tutorial – CRUD in a simple Flex 4 address book: Updating entities'
categories:
- AS3
- Tutorial
tags:
- databinding
- doctrine 2
- Flextrine
- flush
- merging
- notify
- persist
- property change
- propertychangeevent
- updating
permalink: "/flextrine-tutorial-crud-in-a-simple-flex-4-address-book-updating-entities/"
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

Once an entity is in an EntityRepository (either because it was loaded from the database or it was persisted) it is known as a **MANAGED** entity.&#160; This means that Flextrine will constantly watch the entity to see if anything changes, and if so will mark the entity for updating on the next flush().

Therefore updating entities is extremely simple – as long as the entity is managed there is literally nothing to do :)

Lets create an editor for the ContactGroups (in the same directory as Main.mxml):

#### ContactGroupEditor.mxml

```mxml
<?xml version="1.0" encoding="utf-8"?>
<s:Group xmlns:fx="http://ns.adobe.com/mxml/2009"
         xmlns:s="library://ns.adobe.com/flex/spark"
         xmlns:mx="library://ns.adobe.com/flex/mx">

  <fx:Script>
  <![CDATA[
    import vo.ContactGroup;
    
    [Bindable]
    public var contactGroup:ContactGroup;
    
  ]]>
  </fx:Script>
  
  <mx:Form labelWidth="150" width="100%" height="100%">
  
  <mx:FormHeading label="Edit group" />
  
  <mx:FormItem label="Name">
  <s:TextInput text="@{contactGroup.name}" />
  </mx:FormItem>
  
  </mx:Form>
</s:Group>
```

The component takes a *contactGroup* and provides a TextInput that edits its *name* attribute using Flex 4 two-way databinding.&#160; In fact you need to be careful with two-way databinding on some components (e.g. DateChooser) as it can cause unnecessary updates, but it works fine for Spark’s TextInput.

Now we need to add the ContactGroupEditor into Main.mxml:

```mxml
<s:VGroup width="100%" height="100%">
  <!-- The editors -->
  <local:ContactGroupEditor contactGroup="{tree.selectedItem as ContactGroup}" enabled="{tree.selectedItem is ContactGroup}" />
```

And that’s it for the group editor.&#160; When we select a *ContactGroup* in the tree, the *ContactGroupEditor* becomes enabled, and the selected item is passed to the editor’s *contactGroup* attribute.&#160; Flex updates the *contactGroup*’s *name* attribute when we change it in the editor and Flextrine automatically picks up on the change and marks the entity for updating.&#160; On the next flush() the changes will be written to the database.

Now for the `ContactEditor`.

### ContactEditor.mxml

```mxml
<?xml version="1.0" encoding="utf-8"?>
<s:Group xmlns:fx="http://ns.adobe.com/mxml/2009"
         xmlns:s="library://ns.adobe.com/flex/spark"
         xmlns:mx="library://ns.adobe.com/flex/mx">

  <fx:Script>
  <![CDATA[
    import org.davekeen.flextrine.orm.EntityManager;
    import vo.ContactGroup;
    import vo.Contact;
    
    [Bindable]
    public var contact:Contact;
  ]]>
  </fx:Script>
  
  <mx:Form labelWidth="150" width="100%" height="100%">
  
    <mx:FormHeading label="Edit contact" />
    
    <mx:FormItem label="Name">
      <s:TextInput text="@{contact.name}" />
    </mx:FormItem>
    
    <mx:FormItem label="Telephone number">
      <s:TextInput text="@{contact.telephoneNumber}" />
    </mx:FormItem>
    
    <mx:FormItem label="Birthday">
      <mx:DateChooser selectedDate="{contact.birthday}" change="contact.birthday = event.currentTarget.selectedDate" />
    </mx:FormItem>
    
    <mx:FormItem label="Group">
      <s:DropDownList dataProvider="{EntityManager.getInstance().getRepository(ContactGroup).entities}"
                      selectedItem="{contact.contactGroup}"
                      change="contact.setContactGroup(event.currentTarget.selectedItem);"
                      labelField="name" />
    </mx:FormItem>
  
  </mx:Form>
</s:Group>
```

The contact editor is marginally more complicated, but still fairly simple.&#160; A few points:

- Note is that as mentioned above we don’t use two-way databinding on any component apart from TextInput. 
- Although it is perfectly legal to retrieve the singleton EntityManager in the ContactEditor as we have done in the DropDownList dataProvider, in a real application we probably wouldn’t do this as it breaks encapsulation.&#160; I’ve done it here for the sake of simplicity :) 

Finally we need to add the editor to Main.mxml:

```mxml
...
<s:VGroup width="100%" height="100%">
    <!-- The editors -->
    <local:ContactGroupEditor contactGroup="{tree.selectedItem as ContactGroup}" enabled="{tree.selectedItem is ContactGroup}" />
    <mx:HRule width="100%" />
    <local:ContactEditor contact="{tree.selectedItem as Contact}" enabled="{tree.selectedItem is Contact}" />
...
```

An that’s it!&#160; A simple but fully functioning, database aware Flex application.

And now, [the thrilling conclusion]({% post_url 2010-08-03-9-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-conclusion %}).
