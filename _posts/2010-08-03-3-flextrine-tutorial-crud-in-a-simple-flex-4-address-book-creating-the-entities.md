---
layout: post
title: 'Flextrine Tutorial – CRUD in a simple Flex 4 address book: Creating the entities'
categories:
- AS3
- Tutorial
tags:
- entities
- explicitType
- Flextrine
- inversedBy
- jpa
- many to one
- manytoone
- mappedBy
- one to many
- onetomany
- uml
permalink: "/flextrine-tutorial-crud-in-a-simple-flex-4-address-book-creating-the-entities/"
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

Now that Flextrine has been configured we need to create our entities.  [Entities](https://code.google.com/p/flextrine2/wiki/Entities) are the objects that we want to enable for reading and writing to the database, and they are defined in PHP in the *entities* directory of the Flextrine server side component.

The requirements for our simple address book are that we need to have groups containing contacts.  Unfortunately Group is a reserved word in SQL so we’ll call it ContactGroup.  ContactGroups have a name, and many Contacts, and Contacts have a name, telephone number, birthday and a contactGroup.  We are going to place all our entities in the **vo **package.  This gives us the class diagram below:

![Flextrine entities]({{ "/assets/uploads/2010/08/entities.jpg" | relative_url }})

Create a folder called *vo* in the *entities* directory of the Flextrine server side component and create *ContactGroup.php* and *Contact.php* with the contents given below.  More information on writing entities can be found in the Doctrine documentation for [Basic Mapping](https://www.doctrine-project.org/projects/orm/2.0/docs/reference/basic-mapping/en#basic-mapping) and [Association Mapping](https://www.doctrine-project.org/projects/orm/2.0/docs/reference/association-mapping/en#association-mapping).  The main thing to remember when creating entities is that:

- All mapped attributes **must** be public

#### ContactGroup.php

```php
<?php
namespace vo;

use DoctrineCommonCollectionsArrayCollection;
/**
 * @Entity
 */

class ContactGroup {

  /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY") */
  public $id;

  /** @Column(length=100, type="string") */
  public $name;

  /**
   * @OneToMany(targetEntity="Contact", mappedBy="contactGroup")
   */
  public $contacts;

  public function __construct() {
    $this->contacts = new ArrayCollection();
  }

}
```

#### Contact.php

```php
<?php

namespace vo;

use DoctrineCommonCollectionsArrayCollection;

/**
 * @Entity
 */

class Contact {

  /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY") */
  public $id;

  /** @Column(length=80, type="string") */
  public $name;

  /** @Column(length=50, type="string", nullable="true") */
  public $telephoneNumber;

  /** @Column(type="date", nullable="true") */
  public $birthday;

  /**
   * @ManyToOne(targetEntity="ContactGroup", inversedBy="contacts")
   */
  public $contactGroup;

  public function __construct() {
  }

}
```

Now that we have created our entity definitions we need to [create the matching database schema]({% post_url 2010-08-03-4-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-creating-the-database-schema %}).
