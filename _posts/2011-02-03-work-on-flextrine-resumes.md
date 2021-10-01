---
layout: post
title: Work on Flextrine resumes!
categories:
- AS3
tags:
- associations
- flex
- Flextrine
- graniteds
- lazy
- livecycle
- load on demand
- many to many
- many to one
- one to many
- one to one
- orm
- pimento
- speeding up your associations
permalink: "/work-on-flextrine-resumes/"
---

After a few months break I have started work on Flextrine once again.&#160; During the break I have been working a lot with Doctrine 2 in pure PHP, and have learnt a lot of things to do with both the internals of Doctrine and its practical application in a real world application.&#160; Now that Doctrine 2 has its first stable release its time to start applying some of these lessons to Flextrine.

Here are a few of the things that will be in the upcoming release of Flextrine:

- The ability to run multiple Flextrine applications within a single install – Flextrine will ship with a micro-framework to facilitate this along with a command line tool to create new projects. 
- Flextrine Manager functions, including entity generation, will become available through the command line (implemented through the Doctrine console tool) to aid in build processes. The Flextrine Manager will probably be removed. 
- Configuration files will be YAML instead of PHP. 
- Support for XML, YAML as well as annotations in entities (this was done mainly to enable the use of the awesome [ORM Designer](http://www.orm-designer.com/)) . 
- Integrated support for access control to entities using `Zend_Acl`. 
- Massive performance boosts when updating large objects graphs. 
- Lazily loaded collection associations can be configured to load on demand, throwing `ItemPendingErrors` to allow Flex components to react to the updates automatically. 
- Lazily loaded entities can also be configured to load on demand. 
- Improved DQL querying from Flex including support for named parameters. 
- Bi-directional associations are now auto-managed by Flextrine, so there is no longer a need to set both sides of the relationship. 
- An `EntityManager::rollback()` method that undoes any changes made to the repository. 
- Class table inheritance. 
- By default repositories hold weak references so that unused entities are eligible for garbage collection after `Configuration::entityTimeToLive` has elapsed (configurable globally or per repository).
- The option to run Flextrine in PULL mode; this queues up changes but doesn’t apply them to the repositories until a successful return from `em.flush()` (experimental!) 
- PagedCollections which load query results as the user scrolls (experimental!) 
- Heaps of bug fixes! 

 Flextrine 0.9 is currently planned for release towards the end of February.   
