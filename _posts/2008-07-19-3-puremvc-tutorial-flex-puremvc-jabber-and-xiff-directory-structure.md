---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Part 2 - Directory structure'
categories:
- AS3
- Tutorial
tags:
- component
- controller
- directory
- model
- MVC
- mxml
- package
- PureMVC
- tutorial
- view
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-2-directory-structure/"
---

- [Introduction]({% post_url 2008-07-19-1-puremvc-tutorial-flex-puremvc-jabber-and-xiff-introduction %})
- [Part 1 - Frameworks]({% post_url 2008-07-19-2-puremvc-tutorial-flex-puremvc-jabber-and-xiff-frameworks %})
- [Part 2 - Directory structure]({% post_url 2008-07-19-3-puremvc-tutorial-flex-puremvc-jabber-and-xiff-directory-structure %})
- [Part 3 - Application and ApplicationFacade]({% post_url 2008-07-19-4-puremvc-tutorial-flex-puremvc-jabber-and-xiff-application-and-applicationfacade %})
- [Part 4 - Notifications, Commands & Use Cases]({% post_url 2008-07-19-5-puremvc-tutorial-flex-puremvc-jabber-and-xiff-notifications-commands-use-cases %})
- [Part 5 - Model & Proxy]({% post_url 2008-07-19-6-puremvc-tutorial-flex-puremvc-jabber-and-xiff-model-proxy %})
- [Part 6 - The Application View & Mediator]({% post_url 2008-07-19-7-puremvc-tutorial-flex-puremvc-jabber-and-xiff-the-application-view-mediator %})
- [Part 7 - The Login View & Mediator]({% post_url 2008-07-19-8-puremvc-tutorial-flex-puremvc-jabber-and-xiff-the-login-view-mediator %})
- [Part 8 - The Roster View & Mediator]({% post_url 2008-07-19-9-puremvc-tutorial-flex-puremvc-jabber-and-xiff-the-roster-view-mediator %})
- [Part 9 - The Chat View & Mediator]({% post_url 2008-07-19-10-puremvc-tutorial-flex-puremvc-jabber-and-xiff-the-chat-view-mediator %})
- [Conclusion, Demo & Downloads]({% post_url 2008-07-19-11-puremvc-tutorial-flex-puremvc-jabber-and-xiff-conclusion-demo-downloads %})
  
We need to create a PureMVC-friendly folder structure for our application - right click on src and create **org**, then within that create **davekeen**, then within that create **xiffer**.  This will be the base package for our Jabber client.  Now we need folders for the various bits of our application.  Within **xiffer** create three folders named **controller, view, model **and **events**.  Finally within **view** create a folder called **components**.  We should have ended up with a folder structure that looks like this:

```
org
└── davekeen
    └── xiffer
        └── controller
        └── events
        └── model
        └── view
            └── components
```

Now is a good time to explain what each folder's contents and functions are.  If you haven't already done so you should have a read through [the PureMVC best practices](https://puremvc.org/component/option,com_wrapper/Itemid,174/) and [framework overview](https://puremvc.org/component/option,com_wrapper/Itemid,35/) as it will make things a lot clearer.

#### org.davekeen.xiffer

This is the base package of our application and will contain Application.mxml (the Flex entry point) and ApplicationFacade.as (the PureMVC entry point).  The rest of the application will be contained in the other folders.

#### org.davekeen.xiffer.controller

The controller package contains **commands** which implement individual pieces of business logic.  For our Jabber client this will be things like login, logout and send message.

#### org.davekeen.xiffer.model

The model package contains **proxies** which are the bits of code that do all the dirty work.  All communication between our application and the Jabber server will happen within the proxy; in fact this is the only bit of the application that will even know that a Jabber server exists.

#### org.davekeen.xiffer.view.components

The **components** packages contains our actual MXML files - the things we'll see on the screen.  Cliff Hall has put a lot of thought into the design of PureMVC and these components know *nothing* about the framework or internals of our app.  When things happen they dispatch events, and they might expose public methods which the framework can invoke.

#### org.davekeen.xiffer.view

The view package contains **mediators** which control our **components**.  In some MVC frameworks this folder might contain the actual objects that are displayed (i.e. subclassing DisplayObject), but PureMVC adds an [extra level of abstraction](https://en.wikipedia.org/wiki/Mediator_pattern).  The **mediators** know about PureMVC, but the **components **are completely self-contained and rely on their associated mediators to do any application-wide communication.

#### org.davekeen.xiffer.events

The majority of communication within PureMVC is done using **notifications**, but the only exception to this is communication from **components** to their **mediators** which is done using normal AS3 events.  Its also perfectly acceptable to put this package within the **view** folder.

[Onto the next part...]({% post_url 2008-07-19-4-puremvc-tutorial-flex-puremvc-jabber-and-xiff-application-and-applicationfacade %})
