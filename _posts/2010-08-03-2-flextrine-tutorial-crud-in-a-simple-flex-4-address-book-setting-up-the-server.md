---
layout: post
title: 'Flextrine Tutorial – CRUD in a simple Flex 4 address book: Setting up the
  server'
categories:
- AS3
- Tutorial
tags:
- connectionOptions
- contact
- doctrine 2
- document root
- Flextrine
- flextrine manager
- include_path
- installing flextrine
- mysql
- pdo
- PHP
permalink: "/flextrine-tutorial-crud-in-a-simple-flex-4-address-book-setting-up-the-server/"
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

Before using Flextrine you need to do some groundwork to get your project ready.

1. Download the latest version of Flextrine from [https://code.google.com/p/flextrine2/downloads/list](http://code.google.com/p/flextrine2/downloads/list)
2. Install the [Flextrine manager](https://code.google.com/p/flextrine2/wiki/InstallingFlextrineManager).&#160; This is as simple as copying the *manager* directory from the Flextrine download into a web-accessible directory.&#160; For the purposes of the tutorial I will assume that you have set the URL pointing at this document root as [http://localhost/flextrinemanager](http://localhost/flextrinemanager).&#160; Note that you will require **mod_rewrite** to be enabled on your webserver for the manager to function correctly. 
3. Install the Flextrine server side libraries.&#160; These are contained in the *flextrine/web/lib* directory of the the Flextrine download.&#160; All you need to do to install these is to copy* flextrine/web/lib* to a directory in your PHP include_path, or ammend the include_path to include the *flextrine/web/lib* directory.&#160; *Note that if you don’t want to change your include_path you can set it explicitly after the next step by uncommenting the $flextrineIncludePAth line in config.php of your project (see *[*https://code.google.com/p/flextrine2/wiki/GettingStarted*](http://code.google.com/p/flextrine2/wiki/GettingStarted)* for more details).*
4. Install the latest version of Doctrine 2 from [https://www.doctrine-project.org/projects/orm/download](https://www.doctrine-project.org/projects/orm/download).&#160; Doctrine 2 is the technology that Flextrine is based upon and required for its operation.&#160; The easiest way to install Doctrine is to merely extract the package into *flextrine/web/lib* as this is already in your PHP include_path.&#160; Alternatively you can add a new entry to your include_path pointing to Doctrine. 
5. Create an empty server-side Flextrine project.&#160; The Flextrine download contains a blank project in *flextrine/web/flextrineproject* which will be your starting point.&#160; Copy this to a new directory on your machine and make this directory web accessible.&#160; For the purposes of this tutorial I will assume that you have set the URL pointing to this directory as [*http://localhost/contacts*](http://localhost/contacts) and will refer to the directory as the *Flextrine server side component.*
6. Create a new MySQL database called *contacts.*
7. In your *Flextrine server side component *open up *config.php* and set the database connection options in the $connectionOptions variable. 

Note that next time you start a new Flextrine projects you only need to do steps 5 – 6 as steps 1 – 4 only need to be done once.

Now we are ready to use Flextrine!&#160; The next step is to [create some entities]({% post_url 2010-08-03-3-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-creating-the-entities %}).
