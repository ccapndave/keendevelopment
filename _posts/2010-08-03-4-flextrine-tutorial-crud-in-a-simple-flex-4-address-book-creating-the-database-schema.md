---
layout: post
title: 'Flextrine Tutorial – CRUD in a simple Flex 4 address book: Creating the database schema'
categories:
- AS3
- Tutorial
tags:
- database schema
- doctrine 2
- entities
- Flextrine
- flextrine manager
- orm
- SQL
- update schema
permalink: "/flextrine-tutorial-crud-in-a-simple-flex-4-address-book-creating-the-database-schema/"
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

Once we have defined the entities in the *entities* directory of the Flextrine server component it is very simple to create the appropriate database schema.

### Creating the database schema

Browse to [http://localhost/flextrinemanager](http://localhost/flextrinemanager) (or whatever URL you pointed to the *manager* directory).  You should see a screen like this:

[![Flextrine Manager 1](/assets/uploads/2010/08/flextrinemanager1.jpg)](/assets/uploads/2010/08/flextrinemanager1.jpg)

Enter the URL of the Flextrine server side component ([http://localhost/contacts](http://localhost/contacts)) in the **FLEXTRINE PROJECT URL** input and **Click to refresh***.*  The Flextrine manager will examine your project and update the manager to show the entities and database.  Now click on **Create schema** to automatically generate the appropriate tables in the database.  The manager should now look like this:

[![Flextrine Manager 2](/assets/uploads/2010/08/flextrinemanager2.jpg)](/assets/uploads/2010/08/flextrinemanager2.jpg)

Under the hood Doctrine 2 has parsed the annotations in ContactGroup and Contact and has determined the appropriate tables and columns that will be required to persist the objects.  Although you will never need to edit the schema manually, the following SQL is what was actually executed when you clicked **CREATE SCHEMA**.  Notice that Doctrine enforces referential integrity through MySQL constraints so that, for example, you cannot delete a ContactGroup which has any Contacts referring to it.

```sql
CREATE TABLE  `contact`.`contactgroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARYKEY (`id`)
);

CREATE TABLE  `contact`.`contact` (
  `id` int(11) NOTNULL AUTO_INCREMENT,
  `name` varchar(80) NOTNULL,
  `telephoneNumber` varchar(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `contactGroup_id` int(11) DEFAULT NULL,
  PRIMARYKEY (`id`),
  KEY `contactGroup_id` (`contactGroup_id`),
  CONSTRAINT `contact_ibfk_1` FOREIGNKEY (`contactGroup_id`) REFERENCES `contactgroup` (`id`)
);
```

Now that the schema has been created you can use **UPDATE SCHEMA** whenever you add/remove entities or attributes within entities to update the schema without losing any data that is already in the database.  This gives you a very efficient workflow as your entities expand over the lifetime of a project.

We now have everything we need in the Flextrine server side component and in the database.  Its time to [start writing some Flex code]({% post_url 2010-08-03-5-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-loading-the-entities %})!
