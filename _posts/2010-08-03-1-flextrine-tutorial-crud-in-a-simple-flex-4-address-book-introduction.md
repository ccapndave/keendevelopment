---
layout: post
title: 'Flextrine Tutorial – CRUD in a simple Flex 4 address book: Introduction'
categories:
- AS3
- Tutorial
tags:
- address book
- AS3
- as3 entities
- database
- entities
- Flex 4
- Flextrine
- lamp
- mamp
- mysql
- orm
- PHP
- saving objects
permalink: "/flextrine-tutorial-crud-in-a-simple-flex-4-address-book-introduction/"
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

#### UPDATED FOR FLEXTRINE 0.6.5!

After numerous requests I have finally sat myself down to write a basic tutorial for using Flextrine in a practical and simple Flex application.

### What is Flextrine?

In a sentence, *Flextrine* is an open-source solution for reading and writing AS3 objects to and from a remote database.&#160; Flextrine doesn’t really do anything that you couldn’t do by hand using PHP and AS3 code, but it removes most of the grunt work and standardises client-server database interactions.&#160; All being well, database aware Flex applications coded using Flextrine are shorter, more readable and more maintainable.

Documentation for Flextrine is available in its [Google Code wiki](http://code.google.com/p/flextrine2/wiki/Introduction) and its definitely worth having a skim through before beginning the tutorial.

### What shall we build?

In this tutorial we are going to demonstrate some of Flextrine’s functionality by building a simple online contacts manager.&#160; The application will allow us to create, edit and delete contacts, each of which simply have names and telephone numbers.&#160; In order to demonstrate some of Flextrine’s associations we will also allow the user to put contacts into groups.

Note that the purpose of this tutorial is to demonstrate Flextrine rather than Flex, so we won’t be using any frameworks (apart from Flex itself) and where there is a choice between an elegant programming solution and just keeping it simple we’ll be going for the simpler option :)

### Requirements

To run through this tutorial you will need the following:

- [Flex SDK 4](http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+4) (free from Adobe) 
- A nice Flex IDE – I personally use the wonderful [FlashDevelop](https://www.flashdevelop.org), but [Flash Builder 4](https://www.adobe.com/products/flashbuilder/) will do just as well 
- A web server running PHP 5.3+ and MySQL ([WAMP](https://www.wampserver.com/en/) for Windows and [MAMP](https://www.mamp.info/en/index.html) for OSX are good choices) 
- Download the [complete source code](/files/contacts_tutorial_1.zip) for the tutorial and save yourself tedious typing! This does not include the Flextrine AS3 code so you will need to add the source code or SWC to your classpath manually before compiling. 

Lets begin by [installing Flextrine and its dependencies]({% post_url 2010-08-03-2-flextrine-tutorial-crud-in-a-simple-flex-4-address-book-setting-up-the-server %}).
