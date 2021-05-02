---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Conclusion, Demo & Downloads'
categories:
- AS3
- Tutorial
tags:
- demo
- download source
- download source code
- flex demo
- jabber client
- PureMVC
- source code
- xiff
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-conclusion-demo-downloads/"
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
  
Here is a working demo of the application!

If you get a 'Security Error' when trying to connect, it means that the particular Jabber server you are connecting to hasn't implemented its crossdomain.xml file correctly (many servers leave out the content-type which means that the latest versions of Flash Player will refuse to load it).  Anyway, this security policy is ignored when running from your local machine so even if you have trouble using it here it will work fine when you compile it yourself.

```js
swfobject.embedSWF("/flash/xiffer.swf", "xifferDiv", "760", "400", "9.0.0", "/flash/swfobject/expressInstall.swf", {}, {}, {});
```

[You can download the full source code for the project here.](/files/xiffer_tutorial_1.zip)

If you spot any mistakes, want to have a lively discussion or just want to say how much you enjoyed this tutorial please feel free to leave comments on the appropriate page!

My thanks go out to Jive Software for XIFF, Cliff Hall for PureMVC and all Flashers everywhere :)

Dave
