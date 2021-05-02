---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Part 8 - The Roster View
  & Mediator'
categories:
- AS3
- Tutorial
tags:
- buddy list
- connect
- jabber
- jabber friends
- PureMVC
- registerMediator
- roster
- tutorial
- xmpp
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-8-the-roster-view-mediator/"
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

By now you're probably becoming a bit of an old hand at this PureMVC lark, so I'm going to be explaining stuff in a bit less detail.&#160; If you get stuck re-read the previous sections until you have everything clear in your head.

The Roster is very simple.&#160; We want a Flex DataGrid displaying usernames and login status and we need a 'Start chat...' button that opens a chat window.

In order to implement this view we'll need a new event called *ChatEvent.as*.&#160; The *JID* class is part of the XIFF framework and is used to identify a Jabber user.&#160; The *RosterView* will only use START_CHAT, but we'll need SEND_MESSAGE in the next and final view.

```as3
package org.davekeen.xiffer.events {
  import flash.events.Event;
  import org.jivesoftware.xiff.core.JID;

  /**
   * This event is related to the ChatViews
   * 
   * @author Dave Keen
   */
  public class ChatEvent extends Event {

    public static const START_CHAT:String = "start_chat";
    public static const SEND_MESSAGE:String = "send_message";

    private var jid:JID;
    private var message:String;

    public function ChatEvent(type:String, jid:JID, message:String = null, bubbles:Boolean=false, cancelable:Boolean=false) { 
      super(type, bubbles, cancelable);

      this.jid = jid;
      this.message = message;
    } 

    public function getJID():JID {
      return jid;
    }

    public function getMessage():String {
      return message;
    }

    public override function clone():Event { 
      return new ChatEvent(type, jid, message, bubbles, cancelable);
    } 

  }
}
```

We'll also need to define one new notification in *ApplicationFacade.as* called OPEN_CHAT_WINDOW:

```as3
public static const OPEN_CHAT_WINDOW:String = "open_chat_window";
```

Next we create our *RosterView.mxml* file in *components*:

```mxml
<?xml version="1.0" encoding="utf-8"?>
<mx:Canvas xmlns:mx="http://www.adobe.com/2006/mxml" xmlns="*" width="100%" height="100%">
  <mx:Script>
  <![CDATA[
  import flash.events.Event;
  import mx.events.ListEvent;
  import org.davekeen.xiffer.events.ChatEvent;
  import org.jivesoftware.xiff.core.JID;

  private function onChatClick():void {
    if (rosterGrid.selectedItem) {
      // Get the selected item and convert it to a JID
      var jid:JID = new JID(rosterGrid.selectedItem.jid);

      // Dispatch an event for the mediator
      dispatchEvent(new ChatEvent(ChatEvent.START_CHAT, jid));
    }
  }

  ]]>
  </mx:Script>
  <mx:TitleWindow id="titleWindow" title="Buddy list" enabled="false">
    <mx:DataGrid id="rosterGrid" editable="false" width="160" height="300" showHeaders="true">
      <mx:columns>
        <mx:DataGridColumn dataField="displayName" headerText="Username" />
        <mx:DataGridColumn dataField="online" width="55" headerText="Online?" />
      </mx:columns>
    </mx:DataGrid>
    <mx:Button width="160" label="Chat..." click="onChatClick()" />
  </mx:TitleWindow>
</mx:Canvas>
```

Add this component to the display list of our top-level *Application.mxml* component so that the *<mx:Canvas>* component now reads:

```mxml
<mx:Canvas left="0" top="0" right="0" bottom="0">
    <view:LoginView id="loginView" />
    <view:RosterView y="30" id="rosterView" />
</mx:Canvas>
```

Now we need to create *RosterMediator.as* in the *view* folder, and register it with PureMVC.&#160; Using the rule we applied in the previous section we can see that we need to do this registration in *ApplicationMediator.as*:

```as3
public function ApplicationMediator(viewComponent:Object) {
  // pass the viewComponent to the superclass where 
  // it will be stored in the inherited viewComponent property
  super(NAME, viewComponent);

  facade.registerMediator(new LoginMediator(application.loginView));
  facade.registerMediator(new RosterMediator(application.rosterView));
}
```

All that is left now is to configure our mediator using the same steps as in the previous section.

#### 1. Add listeners

*RosterView.mxml* dispatches only ChatEvent.START_CHAT so let's add a listener in the constructor:

```as3
public function RosterMediator(viewComponent:Object) {
  // pass the viewComponent to the superclass where 
  // it will be stored in the inherited viewComponent property
  super(NAME, viewComponent);

  rosterView.addEventListener(ChatEvent.START_CHAT, onStartChat);
}

private function onStartChat(chatEvent:ChatEvent):void { }
```

#### 2. Add notifications

The Roster window need to enable and disable depending on whether or not the user is connected to a jabber server, and also needs to fill in the DataGrid with the list of buddies.&#160; To achieve these goals the mediator will need to register an interest in **ApplicationFacade.VALID_LOGIN** and **ApplicationFacade.DISCONNECT**.

```as3
override public function listNotificationInterests():Array {
  return [
    ApplicationFacade.VALID_LOGIN,
    ApplicationFacade.DISCONNECT
  ];
}
```

And here are the clauses for the switch statement:

```as3
override public function handleNotification(note:INotification):void {
  switch (note.getName()) {
    case ApplicationFacade.VALID_LOGIN:
      break;
    case ApplicationFacade.DISCONNECT:
      break;
    default:
      break;        
  }
}
```

#### 3. Fill in the event listeners and switch clauses

Firstly we'll fill in the **onStartChat** event listener.&#160; This will very simply send an **ApplicationFacade.OPEN_CHAT_WINDOW** with the JID as the argument.&#160; Although we could have passed the ChatEvent itself as a parameter in this case there is no need to use a value object as to open a chat window we only require a single item of information - the JID.

```as3
private function onStartChat(chatEvent:ChatEvent):void {
  sendNotification(ApplicationFacade.OPEN_CHAT_WINDOW, chatEvent.getJID());
}
```

You'll notice that the **ApplicationFacade.OPEN_CHAT_WINDOW** notification is not mapped to a command - this is because the only responder to the notification will be the ChatMediator that we are about to create in the next section so there is no need to have a command.&#160; However, one of the beautiful things about PureMVC is that if it turned out later in the development that this notification needed to affect the model in some way we could implement this merely by adding a new command and registering it, and there will be no need to make any changes to the rest of the application.

Compile and run the application and enjoy the working buddy list!&#160; [Only one view left to go...]({% post_url 2008-07-19-10-puremvc-tutorial-flex-puremvc-jabber-and-xiff-the-chat-view-mediator %})
