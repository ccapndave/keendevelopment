---
layout: post
title: Adobe, Apple, iPhones, iPads and the Flash Player – my two cents
categories:
- Misc
tags:
- adobe
- apple
- avm
- avm2
- css
- flash
- flash platform
- flash player
- html 5
- html canvas
- ipad
- iphone
- javascript
- os x
- sue
permalink: "/adobe-apple-iphones-ipads-and-the-flash-player-my-two-cents/"
---

There have been some nasty fights recently between Apple and Adobe regarding allowing the Flash Player to run on mobile Apple platforms, which is starting to descend into massive criticism of the Flash platform itself.&#160; I guess its obvious which side of the debate I am going to be on and here is some of my reasoning:

- One part of Apple’s beef with Flash is that it munches performance and battery.&#160; In fact, Flash isn’t inherently a CPU hog, but is a flexible and powerful tool which means that a coder who doesn’t optimize his code well can end up using more resources than they need to.&#160; Apple seem to think that HTML 5 canvas and Javascript will somehow perform better, but it seems pretty obvious to me that bad (or high performance) code in HTML is going to munch just as many resources as its equivalent Flash app.&#160; As a case in point check out the very cool JSNES HTML emulator at [http://benfirshman.com/projects/jsnes/](http://benfirshman.com/projects/jsnes/) – its an awesome project, but just listen to your fan step up as it runs… 
- Another of Apple’s problems is that Flash is a closed platform.&#160; Its true, and I as much as anyone would be happy to see the AVM open up; however, Apple are being pretty hypocritical here – the iPhone/iPad platform (as opposed to Android) is also completely closed.&#160; Furthermore Apple own patents in H.264 (the video codec they are promoting in concert with HTML 5 as the replacement for Flash video) and stand to make a mint out of their ‘open’ replacement.&#160; This sounds like a business tactic to me, rather than any high morals to advance the open source community. 
- As a case in point Apple are quick to mention that even on high powered OS X machines Flash performs badly.&#160; Well, the main reason for this is that Apple block access to certain API required for higher performance, no doubt so that they can then claim that Flash performs badly on high powered OS X machines. 
- In almost all the chat around the web Apple seem to be complaining about one thing (although without specifically saying it); streaming video.&#160; Flash is of course used heavily to deliver video and streaming over the web, but this is a tiny part of what Flash can and does do.&#160; What about Flex, RIAs, applications, etc?&#160; Flash is a fully featured platform which happens to be ok at delivering video but by taking this stance Apple will be blocking everything else that is good about Flash. 

Apple seem to think that everything that Flash can do will be replicable in HTML 5 using Canvas, Javascript and CSS.&#160; Even apart from the fact that HTML 5 does not have anything like the feature set of the AVM, lets think about this from a developer perspective for a second and we can pretty quickly see some of the downfalls:

- Javascript is one of the most horrible programming languages about; in fact its the same as Actionscript 1 which was released in 2000 and then outdated in 2003.&#160; The thought of developing fully featured RIAs in AS1 is horrible! 
- Despite the fact that HTML 5 is a standard, history strongly suggests that its going to perform differently in IE, Firefox, Safari, Opera and every other browser increasing development and maintenance time.&#160; Flash is a plugin, and although this certainly has its negative points at least you can be sure that it will do the same thing in every browser and platform. 
- If there is a bug in the Flash Player, Adobe release a new version which updates itself from within the player.&#160; Imagine if something turns out to be wrong with HTML 5?&#160; Its a standard which means that the bug fix will need to be implemented as a upgrade to the standard, then **every** browser will need to implement the update off their own steam.&#160; We will certainly end up with a situation where browsers support different states of HTML 5 at the same time.&#160; Adding new features will face a similar issue. 

The whole thing feels like Apple playing off consumer loyalties and technical ignorance to try and control as much of the web as they can.&#160; I believe that ultimately this will result either in developers falling away from the Apple mobile platform in favour of devices that support the cross-platform model which will end up damaging their business model.&#160; At which point, no doubt, Flash will suddenly be supported again :)
