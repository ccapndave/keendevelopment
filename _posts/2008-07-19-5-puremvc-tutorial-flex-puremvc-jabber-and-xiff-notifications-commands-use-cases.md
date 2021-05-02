---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Part 4 - Notifications,
  Commands & Use Cases'
categories:
- AS3
- Tutorial
tags:
- business logic
- commands
- mediators
- proxy
- PureMVC
- registercommand
- tutorial
- use case
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-4-notifications-commands-use-cases/"
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

Notifications are the nuts and bolts of a PureMVC application and are used to communicate between the various actors of your application. Notifications can be used for the following paths of communication:

- Mediator -> Mediator
- Mediator -> Command
- Command -> Command
- Command -> Mediator
- Proxy -> Mediator
- Proxy -> Command

In other words, **Commands** and **Mediators** listen out for notifications, and everything can send them. The 'pattern' reason for Proxies not being able to directly listen for notifications is to try and encourage the developer to use a command to do this. In other words, if a mediator wanted to effect a change on a proxy it might send a* DO_SOMETHING* notification, which would invoke *DoSomethingCommand* which would then retrieve the *SomethingProxy *and call *doSomething()* on it. This is less complicated than it sounds and there will be examples of this in the code we'll be writing.

PureMVC also makes it possible for a mediator to directly retrieve a proxy and call methods on it that change its state, although this is often frowned upon by MVC purists. Having said that, there are some situations when it makes more sense to do this in simple cases rather than run through the Mediator->Command->Proxy chain (probably creating an extra command along the way). Always remember that MVC guidelines are just that - guidelines :)

### Use case diagram

![Use cases](/assets/uploads/2008/07/use-cases.gif)

Here's the use case diagram for our user. Its useful to map these out at the start of the project as there is often a 1-1 mapping between use cases and commands. So now lets create these commands and map them to some notifications (we'll leave them empty for the moment, but fill them in later).

To add an empty command right-click on the *controller *folder in the project area and select **Add->New SimpleCommand...** (if you don't see this menu item be sure you've installed the PureMVC FlashDevelop templates from [PureMVC: First thoughts & FlashDevelop templates]({% post_url 2008-05-09-puremvc-first-thoughts-flashdevelop-templates %}) correctly). Add these three commands:

- LoginCommand.as
- LogoutCommand.as
- SendMessageCommand.as

Now we need to setup our notification. Notification names are just strings, so we need to setup static constants for each one. For larger projects with a lot of notifications its usual to create extra classes to hold the constants, but since we are only going to have a few of them we'll put them in ApplicationFacade.as.

```as3
public static const LOGIN:String = "login";
public static const LOGOUT:String = "logout";
public static const SEND_MESSAGE:String = "send_message";
```

Now we need to map these notifications to their associated commands. This means that whenever one of these notifications is sent PureMVC will automatically invoke its mapped command. To do this we call the **registerCommand** method in the **initializeController** method of ApplicationFacade (note that the STARTUP->StartupCommand notification was already setup in the FlashDevelop ApplicationFacade template).

```as3
// Register commands with the controller
override protected function initializeController():void {
  super.initializeController();
  
  registerCommand(STARTUP, StartupCommand);
  
  registerCommand(LOGIN, LoginCommand);
  registerCommand(LOGOUT, LogoutCommand);
  
  registerCommand(SEND_MESSAGE, SendMessageCommand);
}
```

[Now let's create our XMPP proxy...]({% post_url 2008-07-19-6-puremvc-tutorial-flex-puremvc-jabber-and-xiff-model-proxy %})
