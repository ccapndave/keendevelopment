---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Part 7 - The Login View
  & Mediator'
categories:
- AS3
- Tutorial
tags:
- applicationmediator
- custom event
- framework
- handleNotification
- listeners
- listNotificationInterests
- mediator
- registerMediator
- retrieveProxy
- sub component
- tutorial
- xiff
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-part-7-the-login-view-mediator/"
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

In this part of the tutorial we'll create the login bar, and by the end of this section our application will be able to connect to any XMPP server with a username & password!

In the *components* package create a new MXML file name *LoginView.mxml* and in the *view* package create a new mediator called *LoginMediator.as* using **Add->New Mediator...** (if you don't see this menu item be sure you've installed the PureMVC FlashDevelop templates from [PureMVC: First thoughts & FlashDevelop templates]({% post_url 2008-05-09-puremvc-first-thoughts-flashdevelop-templates %}) correctly).

As we explained in the previous section add a helper method to the LoginMediator to cast the viewComponent:

```as3
private function get loginView():LoginView {
  return viewComponent as LoginView;
}
```

Note that in order to get the application to compile you'll need to explicitly import the *LoginView* using:

```as3
import org.davekeen.xiffer.view.components.LoginView;
```

Now we want to add the *LoginView* to the display list by including it in *Application.mxml* (giving it an id of *loginView* so we can reference it from the mediator).  Add this MXML within the `<mx:Application>` tag (stick it at the end just before `</mx:Application>`):

```mxml
<mx:Canvas left="0" top="0" right="0" bottom="0">
  <view:LoginView id="loginView" />
</mx:Canvas>
```

Now we need to register our mediator with PureMVC.  Now this point is important to understand as it seems to confuse  - **since LoginView is a sub-component of Application we need to register the view within the Application's mediator**.  This can be made into a general rule:

- If the mediator you are registering heralds the top level component (i.e. *Application.mxml*) register it in *StartupCommand.*
- If the mediator you are registering heralds a child of another component register it in the constructor of that component's mediator.

Just to confuse things I'd better point out that this rule doesn't apply in quite the same way if you are dynamically creating and removing mediators, but we'll save that for another tutorial.

Anyway, the upshot of all that is that we call **registerMediator** in the constructor of **ApplicationMediator**:

```as3
public function ApplicationMediator(viewComponent:Object) {
  // pass the viewComponent to the superclass where 
  // it will be stored in the inherited viewComponent property
  super(NAME, viewComponent);

  facade.registerMediator(new LoginMediator(application.loginView));
}
```

Here is the code for *LoginView.mxml*.  As this is a PureMVC tutorial, not a Flex one, I'm not going to go in any detail about how it works, but these are the only things you need to care about:

- When the user clicks 'Connect' it dispatches a *LoginViewEvent.LOGIN* event containing the username, password and server.

- When the user clicks 'DIsconnect' it dispatches a *LoginViewEvent.LOGOUT* event.

- It exposes a **showInvalidLoginAlert()** method that pops up a 'Invalid username/password' window.

```mxml
 <?xml version="1.0" encoding="utf-8"?>
 <mx:Canvas xmlns:mx="http://www.adobe.com/2006/mxml" xmlns="*" width="100%" height="100%">
     <mx:Script>
         <![CDATA[
         import mx.controls.Alert;
         import org.davekeen.xiffer.events.LoginViewEvent;

        /**
         * Dispatch a connect event to the mediator
         */
        private function onConnectClick():void {
             dispatchEvent(new LoginViewEvent(LoginViewEvent.LOGIN, usernameTextInput.text, passwordTextInput.text, serverComboBox.text));
         }

        /**
         * Dispatch a disconnect event to the mediator
         */
        private function onDisconnectClick():void {
             dispatchEvent(new LoginViewEvent(LoginViewEvent.LOGOUT));
         }

        /**
         * Enable or disable the connect button depending on whether or not the user has entered something into both username and password fields
         */
        private function usernamePasswordChange():void {
             connectButton.enabled = (usernameTextInput.text.length > 0 && passwordTextInput.length > 0);
         }

        /**
         * Show an invalid login alert and clear the username and password fields
         */
        public function showInvalidLoginAlert():void {
            // Popup an alert
             Alert.show("Invalid username/password", "Error", Alert.OK, this);

             // Clear the input fields and notify the change handler (this will disable the connect button)
             usernameTextInput.text = "";
             passwordTextInput.text = "";
             usernamePasswordChange();
         }

         ]]>
     </mx:Script>

     <mx:Form defaultButton="{connectButton}" paddingTop="0" paddingBottom="0" paddingLeft="0" paddingRight="0">

         <mx:HBox>

             <mx:Label text="Username:" selectable="false" fontSize="14" />
             <mx:TextInput id="usernameTextInput" width="100" change="usernamePasswordChange()" />

             <mx:Label text="Password:" selectable="false" fontSize="14" />
             <mx:TextInput id="passwordTextInput" change="usernamePasswordChange()" displayAsPassword="true" width="100" />

             <mx:Label text="Server:" fontSize="14" />
             <mx:ComboBox id="serverComboBox" editable="true">
                 <mx:ArrayCollection>
                     <mx:String>jabber.se</mx:String>
                     <mx:String>jabber.org</mx:String>
                 </mx:ArrayCollection>
             </mx:ComboBox>

             <mx:Button id="connectButton" label="Connect" enabled="false" click="onConnectClick()" />
             <mx:Button id="disconnectButton" label="Disconnect" enabled="false" click="onDisconnectClick()" />

         </mx:HBox>

     </mx:Form>

 </mx:Canvas>
```

We'll also need to create the custom *LoginViewEvent *(in the *events* folder):

```as3
package org.davekeen.xiffer.events {
  import flash.events.Event;

  /**
  * Events passed between the login view component and its mediator
  * 
  * @author Dave Keen
  */
  public class LoginViewEvent extends Event {

    public static const REGISTER:String = "login_view_register";
    public static const LOGIN:String = "login_view_login";
    public static const LOGOUT:String = "login_view_logout";

    private var username:String;
    private var password:String;
    private var server:String;

    public function LoginViewEvent(type:String, username:String = null, password:String = null, server:String = null, bubbles:Boolean = false, cancelable:Boolean = false) { 
      super(type, bubbles, cancelable);

      this.username = username;
      this.password = password;
      this.server = server;
    }

    public function getUsername():String {
      return username;
    }

    public function getPassword():String {
      return password;
    }

    public function getServer():String {
      return server;
    }

    public override function clone():Event { 
      return new LoginViewEvent(type, username, password, server, bubbles, cancelable);
    }

  }

}
```

Now we're ready to start the interesting bit - implementing our *LoginMediator*.  These are the steps I take when implementing a mediator:

1. Add listeners for all the events dispatched from the view component to the constructor and create event listener methods for them.

2. Identify which notifications this mediator is interested in and add them to the **listNotificationInterests** method's array and the **handleNotification** method's switch statement.

3. Fill in the event listener methods and switch statement clauses.

Now we'll do each of these steps in turn for our *LoginMediator*.

#### 1. Add listeners

Our view component dispatches LoginViewEvent.LOGIN and LoginViewEvent.LOGOUT event, so we'll add our listeners in the constructor and add two empty event listener methods:

```as3
public function LoginMediator(viewComponent:Object) {
  // pass the viewComponent to the superclass where 
  // it will be stored in the inherited viewComponent property
  super(NAME, viewComponent);

  loginView.addEventListener(LoginViewEvent.LOGIN, onConnectClick);
  loginView.addEventListener(LoginViewEvent.LOGOUT, onDisconnectClick);
 }
  
/**
 * The connect button was clicked in the view
 * 
 * @param    loginViewEvent
 */
private function onConnectClick(loginViewEvent:LoginViewEvent):void { }
  
/**
 * The disconnect button was clicked in the view
 * 
 * @param    loginViewEvent
 */
private function onDisconnectClick(loginViewEvent:LoginViewEvent):void { }
```

#### 2. Add notifications

The login view is interest in knowing if a client is connected or not (so that it can enable/disable the 'Connect' & 'Disconnect' buttons accordingly.  It is also interested in knowing if a login attempt was invalid so that it can popup the 'Invalid username/password' alert.  This translates into listening for **ApplicationFacade.VALID_LOGIN**, **ApplicationFacade.INVALID_LOGIN** and **ApplicationFacade.DISCONNECT**.

Firstly we'll add these to the **listNotificationInterests** method:

```as3
override public function listNotificationInterests():Array {
  return [
    ApplicationFacade.VALID_LOGIN,
    ApplicationFacade.INVALID_LOGIN,
    ApplicationFacade.DISCONNECT
  ];
}
 ```

Now we'll add empty clauses for each notification in the **handleNotification** method's switch statement:

```as3
override public function handleNotification(note:INotification):void {
  switch (note.getName()) {
    case ApplicationFacade.VALID_LOGIN:
      break;
    case ApplicationFacade.INVALID_LOGIN:
      break;
    case ApplicationFacade.DISCONNECT:
      break;
    default:
      break;        
  }
}
```

#### 3. Fill in the event listeners and switch clauses

Let do the switch clauses first.  Its all simple stuff - in the event of a valid login we want to enable the 'Disconnect' button and disable the 'Connect' button, in the event of a disconnect we want to enable the 'Connect' button and disable the 'Disconnect' button, and in the event of an invalid login we want to popup the 'Invalid username/password' alert box:

```as3
override public function handleNotification(note:INotification):void {
  switch (note.getName()) {
    case ApplicationFacade.VALID_LOGIN:
      loginView.connectButton.enabled = false;
      loginView.disconnectButton.enabled = true;
      break;
    case ApplicationFacade.INVALID_LOGIN:
      loginView.showInvalidLoginAlert();
      break;
    case ApplicationFacade.DISCONNECT:
      loginView.connectButton.enabled = true;
      loginView.disconnectButton.enabled = false;
      break;
    default:
      break;        
  }
}
```

And now lets fill in our event listeners.  Again, these are very simple - all they do is send the appropriate notification which will then get auto-mapped to the appropriate command - in this case either *LoginCommand* or *LogoutCommand*.

```as3
private function onConnectClick(loginViewEvent:LoginViewEvent):void {
  sendNotification(ApplicationFacade.LOGIN, loginViewEvent);
}

private function onDisconnectClick(loginViewEvent:LoginViewEvent):void {
  sendNotification(ApplicationFacade.LOGOUT, loginViewEvent);
}
```

Notice that for the parameter of the notifications I am just passing the same *LoginViewEvent* we received from the view component.  It could be argued that this breaks encapsulation as the commands shouldn't really know anything about events.  However, after coding a few PureMVC projects I've noticed that its very common for the event you receive from the view to contain the same bits of information needed by the relevant command - in this case LoginCommand needs to know the username, password and server which is exactly the information contained in a *LoginViewEvent*.  Because of this I don't really see the need to create an extra object, and when passing an event as notification parameter I just think of it as a value object instead of an event, but you are certainly justified in taking another view on this.

Now that we have the mediator calling the *LoginCommand* and *LogoutCommand* we'd better fill these in.  Commands can do various different things, but a very common pattern for commands, and what we'll be using here, is:

1. Retrieve the proxy we want to do something with using **retrieveProxy**.

2. Call a method on that proxy, possibly with parameters ripped out of the notification parameter.

With that in mind we can very simply implement *LoginCommand.as*:

```as3
override public function execute(note:INotification):void {
  var loginViewEvent:LoginViewEvent = note.getBody() as LoginViewEvent;
  var xmppProxy:XMPPProxy = facade.retrieveProxy(XMPPProxy.NAME) as XMPPProxy;
  xmppProxy.connect(loginViewEvent.getUsername(), loginViewEvent.getPassword(), loginViewEvent.getServer());
}
```

... and *LogoutCommand.as*:

```as3
override public function execute(note:INotification):void {
  var xmppProxy:XMPPProxy = facade.retrieveProxy(XMPPProxy.NAME) as XMPPProxy;
  xmppProxy.disconnect();
}
```

Guess what?  We have a working application!  Compile the application and play about with it - you'll be able to log in and out of Jabber servers to your heart's content :)  If you download a proper jabber client ([https://www.jabber.org/clients](https://www.jabber.org/clients) has a big list of clients for various platforms) you'll be able to see your user coming on and offline as you click 'Connect' and 'Disconnect'.

Be proud!  All that's left for us to do now is to create a buddy list (called the *Roster* in Jabber parlance) and the chat windows themselves.  If you've come this far maybe you'd like to have a go yourself without reading further.  If not, read on - [Roster view here we come.]({% post_url 2008-07-19-9-puremvc-tutorial-flex-puremvc-jabber-and-xiff-the-roster-view-mediator %})
