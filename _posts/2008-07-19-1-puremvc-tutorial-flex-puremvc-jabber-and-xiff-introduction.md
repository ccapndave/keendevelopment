---
layout: post
title: 'PureMVC Tutorial - Flex, PureMVC, Jabber and XIFF 3: Introduction'
categories:
- AS3
- Tutorial
tags:
- introduction
- jabber
- jabber client
- PureMVC
- templates
- tutorial
- xiff
permalink: "/puremvc-tutorial-flex-puremvc-jabber-and-xiff-3-introduction/"
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
  
I like Actionscript 3, I like Flex, I like Flash and I especially like PureMVC.  In fact, I like them so much that its about time I wrote a fully fledged tutorial to help the rest of you like them as much as I do.  The code we are going to recreate here started life as a technical test for a job I was interested in.  Unfortunately it ended up not being for me, but the code itself lends itself excellently to demonstrating how to use PureMVC as well as creating a decent application along the way.  As you have probably guessed from the title we'll be creating a simple but fully functional Jabber chat client.  Its not exactly going to be feature rich, but by the end of this tutorial your application will allow you to login, logout, show your buddy list and have one-to-one chats with your friends.  Chatrooms, invites and all the other bits of Jabber goodness are left as an exercise for the reader :)

Before we start I should also humbly point out that there are many ways to program using PureMVC - what I've presented in this tutorial is the way that *I* like to do it, and the way that makes the most sense to me.  However there are many equally valid ways to develop within a framework and you shouldn't take my word as gospel, but work in whichever way you find suits you best.

Note that I've programmed the client using Flex merely because its quicker to create popup windows, form elements, etc in Flex than Flash.  However, the bones of the app are valid in both so even if you don't use Flex often you should still be able to get something out of this.

Before we get going, you'll need the following:

- [Flex SDK 2 or 3](https://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+3).  Its free!
- [FlashDevelop 3](https://www.flashdevelop.org/community/viewforum.php?f=11) (you can also use [Flex Builder 3](https://www.adobe.com/products/flex/) but this tutorial is written on the assumption that you are using FlashDevelop)
- FlashDevelop templates for PureMVC - you can get these from [PureMVC: First thoughts & FlashDevelop templates]({% post_url 2008-05-09-puremvc-first-thoughts-flashdevelop-templates %}).  The post includes instructions on how to install them.
- [The full source code for the project.](/files/xiffer_tutorial_1.zip) It will probably be helpful for you to keep this open as you progress through the tutorial.

Now we have the tools, its time to setup our project.  We're going to create an empty FlashDevelop project ready to receive our code.  Open FlashDevelop and select **Project->New Project**.  Choose **Flex 3 project** from the list, name the project 'XIFFer', check 'Create directory for project' and finally click OK to create the new project.

Finally we need to set the dimensions of our Flex application

1. Right click on 'XIFFer' and select **Properties...**
2. Set the dimensions to 760 x 400 px
3. Click **OK**

We've got everything we need to get going!  [Continue onto the next part...]({% post_url 2008-07-19-2-puremvc-tutorial-flex-puremvc-jabber-and-xiff-frameworks %})
