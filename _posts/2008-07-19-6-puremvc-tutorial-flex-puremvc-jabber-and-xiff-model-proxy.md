---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Part 5 - Model & Proxy'
categories:
- AS3
- Tutorial
tags:
- model
- proxy
- PureMVC
- registerproxy
- tutorial
- xiff
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-5-model-proxy/"
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

The model is the 'data' of our application and the proxy is our interface onto that data.  For our particular application the model itself is basically our Jabber connection object, so the Proxy will encapsulate that and expose an interface with the following methods:

- **connect**(username:String, password:String, server:String):void  
- **disconnect**():void  
- **sendMessage**(message:Message):void  
- **getRosterDataProvider**():ArrayCollection

As you can see, the interface is very similar to our use case and commands, and this in no coincidence; each command is going to call the relevant method in its **execute** method.

Create a Proxy in the *model* folder called *XMPPProxy.as* using **Add->New Proxy...** (if you don't see this menu item be sure you've installed the PureMVC FlashDevelop templates from [PureMVC: First thoughts & FlashDevelop templates]({% post_url 2008-05-09-puremvc-first-thoughts-flashdevelop-templates %}) correctly).

I'm just going to include the Proxy code here without much explanation as it doesn't really do anything overly complicated (all of the hard stuff has been done for us in the XIFF library :) )  Have a read through the comments of each method and everything should be clear.

```as3
/**
 * Proxy - PureMVC
 */
package org.davekeen.xiffer.model {
  import flash.events.Event;
  import flash.system.Security;
  import org.davekeen.xiffer.ApplicationFacade;
  import org.jivesoftware.xiff.core.JID;
  import org.jivesoftware.xiff.core.XMPPSocketConnection;
  import org.jivesoftware.xiff.data.Message;
  import org.jivesoftware.xiff.data.Presence;
  import org.jivesoftware.xiff.events.*
  import org.jivesoftware.xiff.im.Roster;
  import org.puremvc.as3.interfaces.IProxy;
  import org.puremvc.as3.patterns.proxy.Proxy;
  import mx.collections.ArrayCollection;

  /**
  * Proxy to XMPP server
  */
  public class XMPPProxy extends Proxy implements IProxy {

    public static const NAME:String = "XMPPProxy";

    private var xmppSocketConnection:XMPPSocketConnection;
    private var roster:Roster;

    public function XMPPProxy(data:Object = null) {
      super(NAME, data);

      setupConnection();
      configureListeners();
    }

    /**
    * Create the required XMPP objects and do any configuration on them that we might require
    */
    private function setupConnection():void {
      xmppSocketConnection = new XMPPSocketConnection();

      roster = new Roster();
      roster.connection = xmppSocketConnection;
    }

    private function configureListeners():void {
      // Add event listeners related to the connection
      xmppSocketConnection.addEventListener(LoginEvent.LOGIN, onLogin);
      xmppSocketConnection.addEventListener(XIFFErrorEvent.XIFF_ERROR, onXiffError);
      xmppSocketConnection.addEventListener(DisconnectionEvent.DISCONNECT, onDisconnect);

      // Add event listeners related to messages
      xmppSocketConnection.addEventListener(MessageEvent.MESSAGE, onMessage);
    }

    /**
    * Attempt to connect to a XMPP server
    * 
    * @param    username
    * @param    password
    * @param    server
    */
    public function connect(username:String, password:String, server:String):void {
      // Attempt to load a crossdomain permissions file
      Security.loadPolicyFile(server + "/crossdomain.xml");

      // Connect using standard profile
      xmppSocketConnection.username = username;
      xmppSocketConnection.password = password;
      xmppSocketConnection.server = server;
      xmppSocketConnection.connect("standard");
    }

    /**
    * Disconnect from a XMPP server.  If not currently connected this will have no effect.
    */
    public function disconnect():void {
      xmppSocketConnection.disconnect();
    }

    /**
    * Return the roster as a data provider
    * 
    * @return
    */
    public function getRosterDataProvider():ArrayCollection {
      return roster;
    }

    /**
    * Send a message to the server
    *
    * @param    message
    */
    public function sendMessage(message:Message):void {
      xmppSocketConnection.send(message);
    }

    /**
    * The user has successfully logged on to the XMPP server
    * 
    * @param    connectionSuccessEvent
    */
    private function onLogin(loginEvent:LoginEvent):void {
      roster.setPresence(Presence.SHOW_CHAT, "", 0);

      sendNotification(ApplicationFacade.VALID_LOGIN);
    }

    /**
    * There has been a Jabber error - most likely an incorrect username/password error
    * 
    * @param    xiffErrorEvent
    */
    private function onXiffError(xiffErrorEvent:XIFFErrorEvent):void {
      if (xiffErrorEvent.errorCode == 400)
        sendNotification(ApplicationFacade.INVALID_LOGIN);
    }

    /**
    * The user has disconnected from the XMPP server
    * 
    * @param    disconnectionEvent
    */
    private function onDisconnect(disconnectionEvent:DisconnectionEvent):void {
      sendNotification(ApplicationFacade.DISCONNECT);
    }

    /**
    * Received a message from the server
    * 
    * @param    messageEvent
    */
    private function onMessage(messageEvent:MessageEvent):void {
      sendNotification(ApplicationFacade.RECEIVE_MESSAGE, messageEvent.data);
    }

  }
}
 ```

One thing you will notice is that the proxy dispatches another few notifications that we haven't included in our ApplicationFacade:

- VALID_LOGIN
- INVALID_LOGIN
- RECEIVE_MESSAGE
- DISCONNECT

So lets go back to our ApplicationFacade and add them in:

```as3
public static const VALID_LOGIN:String = "valid_login";
public static const INVALID_LOGIN:String = "invalid_login";
public static const DISCONNECT:String = "disconnect";
public static const RECEIVE_MESSAGE:String = "receive_message";
```

The final thing we need to do is register our new Proxy with PureMVC.  We do this in *StartupCommand.as *using the **registerProxy** method:

```as3
override public function execute(notification:INotification):void {
     facade.registerProxy(new XMPPProxy());
 }
```

Its quite easy to forget to do this and end up with all kinds of strange errors, so be sure to remember to register any proxies you create.

We've finally got the bones of our application up and running so now its [on to the views and mediators]({% post_url 2008-07-19-7-puremvc-tutorial-flex-puremvc-jabber-and-xiff-the-application-view-mediator %})!
