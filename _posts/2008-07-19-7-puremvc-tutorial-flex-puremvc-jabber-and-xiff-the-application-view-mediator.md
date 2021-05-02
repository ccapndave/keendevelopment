---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Part 6 - The Application
  View & Mediator'
categories:
- AS3
- Tutorial
tags:
- application.mxml
- applicationmediator
- framework
- mediator
- startup
- top level mediator
- tutorial
- view granularity
- xiff
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-6-the-application-view-mediator/"
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

Congratulations on getting this far - we're getting closer to our working Jabber client :)  Before we get going with our first top-level mediator we'll talk about views in a little more detail.  In PureMVC a view consists of:

- **One or more view components**.  This is the thing that the user actually sees and interacts with - in Flash it will be a Sprite or MovieClip, and in Flex it will be an MXML file (or an AS file extending a flex component).  
- **A mediator**.  This is the PureMVC bit of the view and 'heralds' the view components.  Any interaction with the rest of the application is done through the mediator.  Note that although the mediator knows about the existence of the view components, the view components don't know about existence of the mediator!  
- **Events**.  Although not strictly a part of the view, I find it helpful to think of events within the same bundle.  View components communicate with their mediator via events and its common to create custom events for various interactions within the view component.  For example, when we come to the Login view we're going to be dispatching a custom *LoginViewEvent *to the *LoginMediator* when the user clicks on the 'connect' button.

PureMVC makes no assumptions about the way that you structure the tree of views and mediators, apart from requiring that there is one top-level mediator.  In the words of our great leader, Cliff Hall (the creator of PureMVC):

> It is up to you as a developer to determine the granularity of the View Component that is handled a given Mediator. If a Mediator becomes too bloated dealing with all the children of its View Component simply create a Mediator for the more complicated child. For instance, if the child components of the Application instance are complicated enough to justify their own Mediators, then the ApplicationMediator typically creates and registers the appropriate Mediator for each of those children.

This means that you start off with one mediator for your application entry point (i.e. Application.mxml) and then add extra mediators as needed.  In general you tend to have one mediator per visual 'section' of your application, but this is by no means enforced.

Create our *ApplicationMediator.as* in the *view* folder with **Add->New Mediator...** (if you don't see this menu item be sure you've installed the PureMVC FlashDevelop templates from [PureMVC: First thoughts & FlashDevelop templates]({% post_url 2008-05-09-puremvc-first-thoughts-flashdevelop-templates %}) correctly).

At this point its a good idea to add in a helper method to allow you to retrieve the view component that this mediator is looking after (in this case Application.mxml).  To do this add the following private getter:

```as3
private function get application():Application {
  return viewComponent as Application;
}
```

This saves having to constantly case viewComponent to the correct class every time we use it.  Unfortunately I couldn't find a way to get a FlashDevelop template to downcase the class name so we can't generate this function within the template, but you'll soon get into the habit of typing it each time you create a new mediator.

Finally we need to add our new mediator to PureMVC using the **registerMediator** command in *StartupCommand.  *The **execute** method in this command should now read:

```as3
override public function execute(notification:INotification):void {
  facade.registerProxy(new XMPPProxy());

  facade.registerMediator(new ApplicationMediator(notification.getBody() as Application));
}
```

Notice the argument passed to the Mediator - this is the view component that the mediator is supposed to look after (in this case Application.mxml).  **notification.getBody()** retrieves the argument passed along with the notification, and since we sent the notification (in Application.mxml) using **facade.sendNotification(ApplicationFacade.STARTUP, this)** that argument will be the Application object itself!

[Now we'll create the Login view and mediator.]({% post_url 2008-07-19-8-puremvc-tutorial-flex-puremvc-jabber-and-xiff-the-login-view-mediator %})
