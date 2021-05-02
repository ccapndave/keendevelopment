---
layout: post
title: Flextrine 0.9 released
categories:
- AS3
tags:
- '0.9'
- class table inheritance
- flex
- flex database
- flex mysql
- flex object relational mapper
- flex orm
- Flextrine
- graniteds
- itempendingerror
- lazy
- on-demand
- orm
- single table inheritance
permalink: "/flextrine-09-released/"
---

I am very proud to announce the release of Flextrine 0.9.&#160; This is a **major** release with changes across the board; much of the codebase has been improved, optimized and cleaned up, and a host of new features have been added.&#160; Flextrine has also moved from Google Code to Github, and the documentation has been completely updated for the new version and is available on the [Github wiki](https://github.com/ccapndave/flextrine/wiki).&#160; Some of the new features are listed below:

- The ability to run multiple Flextrine applications within a single install – Flextrine will ship with a micro-framework to facilitate this along with a command line tool to create new projects. 
- Flextrine Manager functions, including entity generation, will become available through the command line (implemented through the Doctrine console tool) to aid in build processes.&#160; The Flextrine Manager has been removed. 
- Configuration files are YAML instead of PHP. 
- Support for XML, YAML as well as annotations in entities (this was done mainly to enable the use of the awesome [ORM Designer](http://www.orm-designer.com/)) . 
- Massive performance boosts when updating large objects graphs. 
- Lazily loaded collection associations can be configured to load on demand, throwing ItemPendingErrors to allow Flex components to react to the updates automatically. 
- Lazily loaded entities can be configured to load on demand. 
- Improved DQL querying from Flex including support for named parameters and hydration modes including scalar queries. 
- Bi-directional associations are now auto-managed by Flextrine, so there is no longer a need to set both sides of the relationship. 
- An EntityManager::rollback() method that undoes any changes made to the repository. 
- Class table and single table inheritance. 
- By default repositories hold weak references so that unused entities are eligible for garbage collection after Configuration::entityTimeToLive has elapsed (configurable globally or per repository). 
- The option to run Flextrine in PULL mode; this queues up changes but doesn’t apply them to the repositories until a successful return from em.flush() (experimental!) 
- PagedCollections which load query results as the user scrolls (experimental!) 
- Integrated support for access control to entities using Zend_Acl (experimental!) 
- Heaps of bug fixes! 

Flextrine v0.9 is available from [www.flextrine.com](http://www.flextrine.com)
