---
layout: post
title: 'PureMVC: First thoughts & FlashDevelop templates'
categories:
- AS3
tags:
- arp framework
- controller
- model
- model view controller
- MVC
- PureMVC
- view
permalink: "/puremvc-first-thoughts-flashdevelop-templates/"
---

**For those who aren't interested in this blog and just want to get the FlashDevelop templates for PureMVC 2.0.3** [**you can download them here!**](/assets/uploads/2008/05/puremvcflashdeveloptemplates.zip)

I've been meaning to have a good play with [PureMVC](http://puremvc.org/) for a while, and finally found some time a few days ago to check it out. For those who don't know, PureMVC is one of a few Actionscript [Model-View-Controller](http://en.wikipedia.org/wiki/Model-view-controller) (MVC) frameworks for Actionscript. Two big established frameworks are [ARP](http://osflash.org/projects/arp) and [Cairngorm](http://labs.adobe.com/wiki/index.php/Cairngorm) (for Flex), and there are a bunch of other less well known frameworks, lots of which are available from [OSFlash](http://osflash.org/).

Personally I'm looking to get a few specific things out of my MVC framework:

- Encapsulated concerns, high cohesion and loose coupling
- Minimum configuration & ease of coding
- Ease of maintenance

I'll talk about each of these things separately. At this point I should point out that I have only been working with PureMVC for a little more than a day (that's why it says *first thoughts* in the title), and some of what I'm saying here might be wrong! Any discussion on these points is gratefully received.

### Encapsulated concerns, high cohesion and loose coupling

PureMVC takes a slightly different approach to the MVC design pattern than the official (if there is such a thing) stance, adding a bunch of extra design patterns into the mix. The View, Model and Controller are [Singletons](https://en.wikipedia.org/wiki/Singleton_pattern) with access provided through a central [Facade](https://en.wikipedia.org/wiki/Facade_pattern) which is effectively the entrypoint and hub of your application. Models are then implemented as [Proxies](https://en.wikipedia.org/wiki/Proxy_pattern), controllers as [Commands](https://en.wikipedia.org/wiki/Command_pattern) and views as [Mediators](https://en.wikipedia.org/wiki/Mediator_pattern). Communication between object is mostly done using PureMVC's own Notification system rather than AS3 Events - this seems an odd design decision, but now that PureMVC is being ported to a whole host of different languages which do not support AS3 Events (Ruby, Python, HaXe, etc) this makes sense. I haven't yet delved into the code to see if AS3 events are being used under the hood but if they are not, and if this performance boost was required, I imagine it would be fairly easy to implement. Note that AS3 events are still used on the visual side of things (i.e. between the Views and their Mediators).

Implementing the model through a proxy makes excellent sense, and makes the implementation of the model transparent to the rest of the application. All the app needs to care about is whether the call is synchronous or asynchronous and it should be possible to swap models around to your heart's content. In fact, I'm sure it would be possible to ammend the Proxy such that all calls are treated as asynchronous giving complete transparency to the rest of the app.

Implementing controllers through commands is tried and tested, and pretty common. Its always worked fine for me. One nice touch that PureMVC adds is to allow direct mapping of Notifications->Commands with code such as:

```as3
registerCommand(STARTUP, StartupCommand);
```

Nice and easy :)

The View/Mediator decision is a little more controversial, and I've read more than a few bloggers who find this a serious flaw in PureMVC. I can certainly see the motivation for it and in some ways its a very elegant solution, but I'll need to try writing a medium-large size app before I can really comment. If the coder keeps it together and organises his components, mediators and composition carefully it could be that this works well. More on this in a later blog.

### Minimum configuration & ease of coding

PureMVC involves a lot of typing. Creating a Mediator from scratch is a whole lot of hassle. Luckily for you [FlashDevelop](https://www.flashdevelop.org) users I've updated some templates to work with PureMVC 2.0.3 (apologies to whoever wrote these in the first place - can't find the URL, but will link as soon as I do!). [Download them here](/assets/uploads/2008/05/puremvcflashdeveloptemplates.zip) and unzip to:

C:Documents and Settings<user>Local SettingsApplication DataFlashDevelopTemplatesProjectFilesAS3Project

However, even with templates taking away a lot of the setup work, there is **still **a lot of typing to do. Need to get a reference to a Proxy in your Command?

```as3
var userProxy:UserProxy = facade.retrieveProxy(UserProxy.NAME) as UserProxy;
```

Ok, maybe I'm being pedantic, but when I'm writing a large RIA application I can imagine this getting very annoying. And my initial thoughts are that this seems to be a general theme throughout PureMVC; there is often a lot of work to do in order to get a simple task done. However, my feeling is that there will be a bunch of common tasks that will be able to be automated either through utility classes or through your IDE. And if the result of this extra typing is an elegantly structured and maintainable app then I guess its all worthwhile in the end :)

### Ease of maintenance

GIGO. PureMVC goes a long way to forcing the programmer to 'do the right thing', but I reckon you can still end up with a mess of spaghetti if you are not careful. At this point the potential stumbling blocks seem to me to include:

- Badly composed view and mediators.
- Unnecessary numbers of Proxies, Commands and Mediators.
- De-centralised logic (i.e. business logic placed in the view, which is actually possible with PureMVC)

I can easily envisage a situation where a bug arises and the developer is hard pushed to work out if it is located in the Mediator, Command or Proxy. However, I could be wrong about this and am very much looking forward to finding out myself.

### Conclusion

Well, there isn't one yet. I've a couple of weeks contractual work beginning next week where with any luck the client will be happy to have PureMVC let loose on their project so once I have some more hands-on practical experience with this framework I'll be blogging something new. More later :)
