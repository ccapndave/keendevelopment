---
layout: post
title: 'Flextrine Tutorial – CRUD in a simple Flex 4 address book: Deleting entities'
categories:
- AS3
- Tutorial
tags:
- AMFPHP
- delete click
- deleting
- deleting entities
- doctrine 2
- entitymanager remove
- Flextrine
- flush
permalink: "/flextrine-tutorial-crud-in-a-simple-flex-4-address-book-deleting-entities/"
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
- 
Deleting entities is very simple.&#160; Update the delete button MXML tag to call `onDeleteClick()` when clicked, and to only be enabled if there is a selection in the tree.

```mxml
<s:Button label="Delete" click="onDeleteClick()" enabled="{tree.selectedItem != null}" />
```

And implement the `onDeleteClick()` method:

```as3
private function onDeleteClick():void {
  em.remove(tree.selectedItem);

  if (tree.selectedItem is Contact)
    tree.selectedItem.contactGroup.removeContact(tree.selectedItem);
}
```

Notice that we maintain the bi-directional association if the deleted item is a contact by removing it from its associated contactGroup.

And that’s it :)&#160; The entity will be removed from its entity repository (updating the tree via databinding) and on the next `flush()` it will be removed from the database.

The final step in our little address book is to allow the user to [update existing entities]({% post_url 2010-08-03-8-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-updating-entities %}).
