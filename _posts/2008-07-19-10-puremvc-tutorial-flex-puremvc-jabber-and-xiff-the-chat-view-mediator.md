---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF Part 9 - The Chat View
  & Mediator'
categories:
- AS3
- Tutorial
tags:
- chat window
- jabber chat
- jabber client
- popupmanager
- PureMVC
- tutorial
- view components
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-9-the-chat-view-mediator/"
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

The final mediator, and the final actor in our application.  The job of the chat view is to popup a window where you receive and send message to another user.  You should be able to open multiple chat windows at once, and each window is bound to a specific and unique JID.

I'm just going to present the code for this with a short explanation of anything odd rather than explicitly go through the steps.  If you have trouble understanding anything go back to the previous sections on mediators and read them through again.

*ChatView.mxml*

```mxml
<?xml version="1.0" encoding="utf-8"?>
<mx:TitleWindow xmlns:mx="http://www.adobe.com/2006/mxml" title="" showCloseButton="true">
  <mx:Script>
  <![CDATA[
  import mx.formatters.DateFormatter;
  import org.davekeen.xiffer.events.ChatEvent;
  import org.jivesoftware.xiff.core.JID;
  import org.jivesoftware.xiff.data.Message;

  private var jid:JID;

  /**
   * The send button was clicked so dispatch an event to the mediator
   */
  private function sendClick():void {
    var inputText:String = inputTextArea.text;

    if (inputText && inputText.length > 0) {
      dispatchEvent(new ChatEvent(ChatEvent.SEND_MESSAGE, jid, inputText));
      inputTextArea.text = "";
    }
  }

  public function setJID(jid:JID):void {
    this.jid = jid;

    title = jid.toBareJID();
  }

  public function getJID():JID {
    return jid;
  }

  /**
   * Format and add a message to the chat pane
   * 
   * @param    message
   */
  public function addMessage(message:Message):void {
    var dateFormatter:DateFormatter = new DateFormatter();
    dateFormatter.formatString = "HH:NN";
    chatTextArea.text += "[" + dateFormatter.format(new Date()) + "] " + message.body + "\n";
  }

  ]]>
  </mx:Script>
  <mx:VBox>
    <mx:TextArea editable="false" width="270" height="200" id="chatTextArea" />
    <mx:HBox>
      <mx:TextArea width="210" height="40" id="inputTextArea" />
      <mx:Button id="sendButton" width="50" height="40" label="Send" click="sendClick()" />
    </mx:HBox>
  </mx:VBox>
</mx:TitleWindow>
```

*ChatMediator.as*

There is something slightly different about this view compared to the Login or Roster views.  The chat windows are dynamically created when needed and thrown away when they are closed by the user so we can't have a permanent view component as the **viewComponent** of *ChatMediator.as*.  Instead we'll pass the top level *Application.mxml *component since this is what's required in the arguments of **PopupManager.addPopup**.

```as3
/*
 Mediator - PureMVC
 */
package org.davekeen.xiffer.view {
  import flash.display.DisplayObject;
  import flash.display.DisplayObjectContainer;
  import flash.events.Event;
  import mx.managers.PopUpManager;
  import mx.managers.PopUpManagerChildList;
  import org.davekeen.xiffer.ApplicationFacade;
  import org.davekeen.xiffer.events.ChatEvent;
  import org.jivesoftware.xiff.core.JID;
  import org.jivesoftware.xiff.data.Message;
  import org.puremvc.as3.interfaces.INotification;
  import org.puremvc.as3.patterns.mediator.Mediator;
  import org.davekeen.xiffer.view.*;
  import org.davekeen.xiffer.view.components.ChatView;

  /**
    * Chat Mediator - controls and stewards all popup chat windows
    */
  public class ChatMediator extends Mediator implements IMediator {

    // Cannonical name of the Mediator
    public static const NAME: String = "ChatMediator";

    /**
      * An associative array of open ChatViews
      */
    private var chatViews: Array;

    public function ChatMediator(viewComponent: Object) {
      // pass the viewComponent to the superclass where 
      // it will be stored in the inherited viewComponent property
      super(NAME, viewComponent);

      chatViews = new Array();
    }

    /**
      * Get the Mediator name.
      * <P>
      * Called by the framework to get the name of this
      * mediator. If there is only one instance, we may
      * define it in a constant and return it here. If
      * there are multiple instances, this method must
      * return the unique name of this instance.</P>
      * 
      * @return String the Mediator name
      */
    override public function getMediatorName(): String {
      return ChatMediator.NAME;
    }

    /**
      * List all notifications this Mediator is interested in.
      * <P>
      * Automatically called by the framework when the mediator
      * is registered with the view.</P>
      * 
      * @return Array the list of Nofitication names
      */
    override public function listNotificationInterests(): Array {
      return [
        ApplicationFacade.OPEN_CHAT_WINDOW,
        ApplicationFacade.RECEIVE_MESSAGE,
        ApplicationFacade.VALID_LOGIN,
        ApplicationFacade.DISCONNECT
      ];
    }

    /**
      * Handle all notifications this Mediator is interested in.
      * <P>
      * Called by the framework when a notification is sent that
      * this mediator expressed an interest in when registered
      * (see <code>listNotificationInterests</code>.</P>
      * 
      * @param INotification a notification 
      */
    override public function handleNotification(note: INotification): void {
      switch (note.getName()) {
        case ApplicationFacade.OPEN_CHAT_WINDOW:
          var jid: JID = note.getBody() as JID;
          showChatWindow(jid);
          break;
        case ApplicationFacade.RECEIVE_MESSAGE:
          var message: Message = note.getBody() as Message;

          // Add the message to the view
          chatViews[message.from.toBareJID()].addMessage(message);
          break;
        case ApplicationFacade.VALID_LOGIN:
          // Enable all chat windows
          for each(var chatView: ChatView in chatViews)
          chatView.enabled = true;

          break;
        case ApplicationFacade.DISCONNECT:
          // Disable all chat windows
          for each(chatView in chatViews)
          chatView.enabled = false;

          break;
        default:
          break;
      }
    }

    /**
      * Open up a chat window for this particular JID
      * 
      * @param    jid
      */
    private function showChatWindow(jid: JID): void {
      // If the window exists already don't do anything
      if (!chatViews[jid.toBareJID()]) {
        var chatView: ChatView = new ChatView();

        PopUpManager.addPopUp(chatView, viewComponent as DisplayObjectContainer, false);
        PopUpManager.bringToFront(chatView);
        PopUpManager.centerPopUp(chatView);

        chatView.addEventListener(Event.CLOSE, onChatViewClose);
        chatView.addEventListener(ChatEvent.SEND_MESSAGE, onSendMessage);
        chatView.setJID(jid);

        // Add the chat view to the associative array
        chatViews[jid.toBareJID()] = chatView;
      }
    }

    /**
      * The user has typed a message and sent it
      * 
      * @param    chatEvent
      */
    private function onSendMessage(chatEvent: ChatEvent): void {
      var chatView: ChatView = chatEvent.currentTarget as ChatView;

      // Construct a XIFF message
      var message: Message = new Message(chatEvent.getJID(), null, chatEvent.getMessage(), null, Message.CHAT_TYPE);

      // Echo it to our own view
      chatViews[chatView.getJID().toBareJID()].addMessage(message);

      // And send off a notification
      sendNotification(ApplicationFacade.SEND_MESSAGE, message);
    }

    /**
      * The chat window has been closed
      * 
      * @param    event
      */
    private function onChatViewClose(event: Event): void {
      var chatView: ChatView = event.currentTarget as ChatView;
      chatView.removeEventListener(Event.CLOSE, onChatViewClose);
      PopUpManager.removePopUp(chatView);

      // Delete the chat view from the associative array
      delete chatViews[chatView.getJID().toBareJID()];
    }

  }
}
```

*SendMessageCommand.as*

```as3
/**
 * Simple Command - PureMVC
 */
package org.davekeen.xiffer.controller {
  import org.davekeen.xiffer.events.ChatEvent;
  import org.davekeen.xiffer.model.XMPPProxy;
  import org.jivesoftware.xiff.data.Message;
  import org.puremvc.as3.interfaces.INotification;
  import org.puremvc.as3.patterns.command.SimpleCommand;
  import org.puremvc.as3.patterns.observer.Notification;

  /**
   * Send a message to the proxy
   */
  public class SendMessageCommand extends SimpleCommand {

    override public function execute(note:INotification):void {
      var message:Message = note.getBody() as Message;
      var xmppProxy:XMPPProxy = facade.retrieveProxy(XMPPProxy.NAME) as XMPPProxy;

      // Send the message
      xmppProxy.sendMessage(message);
    }

  }
}
```

And there it is!  A working Jabber, Flex and PureMVC application of your very own.

Let's wrap it all up with a [conclusion, a working demo and the full source code.]({% post_url 2008-07-19-11-puremvc-tutorial-flex-puremvc-jabber-and-xiff-conclusion-demo-downloads %})
