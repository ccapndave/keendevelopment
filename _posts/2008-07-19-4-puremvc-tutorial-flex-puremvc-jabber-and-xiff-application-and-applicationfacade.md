---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Part 3 - Application
  and ApplicationFacade'
categories:
- AS3
- Tutorial
tags:
- application
- applicationfacade
- hello world
- mxml
- PureMVC
- startup notification
- startupcommand
- tutorial
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-3-application-and-applicationfacade/"
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

Every application needs an entry point. PureMVC projects can in fact be thought of as having two entry points - one is the AVM entry point; the first class that is actually executed (this is the 'real' entry point). The other is the **ApplicationFacade** which kicks off the PureMVC framework and this is the class that should be considered the centre of our application.

FlashDevelop will probably have automatically created an entry point called *Main.mxml* - go ahead and delete this at this point as we will be replacing it with our own file.

Our 'Flex' entry point will be called Application.mxml (my PureMVC project entry points are always named Application.mxml or Application.as - I'm not sure if this is an official PureMVC naming convention but its always a good idea to decide on a naming scheme and them stick to it). Navigate to the **org.davekeen.xiffer** directory in the project area of FlashDevelop, right click and select **Add->New MXML File...** and in the prompt box name the new file **Application.mxml** and click **OK**.

Here's the code for our application entry point:

```mxml
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml"
    xmlns:view="org.davekeen.xiffer.view.components.*"
    layout="absolute"
    width="760" height="440"
    verticalGap="0"
    horizontalGap="0"
    creationComplete="facade.sendNotification(ApplicationFacade.STARTUP, this);">
    <mx:Script>
        <![CDATA[
        import org.davekeen.xiffer.ApplicationFacade;

        private var facade:ApplicationFacade = ApplicationFacade.getInstance();
        ]]>
    </mx:Script>
</mx:Application>
```

This MXML file has no function at all apart from sending a STARTUP notification, which will kick off our PureMVC application. Later we'll add the top-level view **components** to this, but for now we're just interested in getting the basic framework up and running. In order to let FlashDevelop know that this is the entry point right-click the file in the project area and select **Always Compile** from the popup menu.

Now we need the ApplicationFacade. Right click on the **xiffer** folder in the project area and select **Add->New ApplicationFacade...** and name it *ApplicationFacade.as*. If you can't see **New ApplicationFacade...** in the **Add** menu be sure you have installed the PureMVC FlashDevelop templates from [PureMVC: First thoughts & FlashDevelop templates]({% post_url 2008-05-09-puremvc-first-thoughts-flashdevelop-templates %}) correctly.

Finally we need a **StartupCommand**. Right click on the **controller** folder and select **Add->New SimpleCommand...** and name it *StartupCommand.as*. Let go for a classic - in the **execute** method add:

```as3
trace("Hello world!");
```

Your **StartupCommand.as **should now look like this:

```as3
/**
 * Simple Command - PureMVC
 */
package org.davekeen.xiffer.controller {
  import org.puremvc.as3.interfaces.INotification;
  import org.puremvc.as3.patterns.command.SimpleCommand;
  import org.puremvc.as3.patterns.observer.Notification;

  /**
   * SimpleCommand
   */
  public class StartupCommand extends SimpleCommand {

    override public function execute(note:INotification):void {
      trace("Hello world!");
    }

  }
}
```

And there we have a working Flex/PureMVC HelloWorld application! Run it and feel proud :)

[Now lets add some notifications...]({% post_url 2008-07-19-5-puremvc-tutorial-flex-puremvc-jabber-and-xiff-notifications-commands-use-cases %})
