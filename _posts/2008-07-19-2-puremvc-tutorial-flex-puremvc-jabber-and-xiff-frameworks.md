---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Part 1 - Frameworks'
categories:
- AS3
- Tutorial
tags:
- classpath
- ejabberd
- framework
- stream
- tutorial
- xiff
- xmpp
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-1-frameworks/"
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
- 
Now that we've got a basic FlashDevelop project setup we can install the frameworks we'll be using.

#### PureMVC

Download the PureMVC framework from [here](https://trac.puremvc.org/PureMVC_AS3/wiki/Downloads).  Put this into a directory somewhere on your machine and add this to the FlashDevelop project classpath like so:

1. Right click on 'XIFFer' and select **Properties...**
2. Go to the **Classpaths** tab
3. Click **Add Classpath...** and in the directory selector choose the PureMVC *src* folder.

#### XIFF

XIFF is an excellent Actionscript XMPP (Jabber) framework that we'll be using to take care of the internals of Jabber communication.  Its been around since Actionscript 2 but has recently been ported to Actionscript 3 (albeit in beta form).  Download it [here](https://www.igniterealtime.org/projects/xiff/), put it into a directory and add the classpath as above.

As XIFF is currently in beta you'll need to make a small change in order to get it to play nice with ejabberd - a common Jabber server written in Erlang.  Research tells me that this is actually a problem with ejabberd's implementation rather than XIFF's, but whatever the issue might be this will fix it :)

1. Open *org.jivesoftware.xiff.core.XMPPSocketConnection*
2. Goto line 108
3. Remove the **version="1.0" /** so that the line now reads:

```as3
openingStreamTag = "<?xml version="1.0"?><stream:stream to="" + server + "" xmlns="jabber:client" xmlns:stream="[http://etherx.jabber.org/streams"](http://etherx.jabber.org/streams)>";
```

Now we're all sorted with the bits we require and its time to [set up our directories and packages]({% post_url 2008-07-19-3-puremvc-tutorial-flex-puremvc-jabber-and-xiff-directory-structure %}).
