---
layout: post
title: Flextrine 0.7 released – now with ZendAMF!
categories:
- AS3
tags:
- AMFPHP
- AS3
- associations
- doctrine 2
- entities
- entity
- flex
- Flex 4
- Flextrine
- gpl
- jpa
- mysql
- orm
- persistence
- released
- zend amf
- zendamf
permalink: "/flextrine-07-released-now-with-zendamf/"
---

After much soul searching I eventually decided to put in the time to convert Flextrine from using AMFPHP to ZendAMF. There were a few reasons I decided to make this move, but eventually it boiled down to the fact that quite a few people had asked me to do so. In retrospect it was certainly the right thing to do – ZendAMF has the green light from Adobe, its licence is LGPL instead of GPL and the cleaner code base means that the changes Flextrine requires can be implemented as overridden classes instead of having to modify the ZendAMF core. This particularly is great news because it means that you can use Flextrine directly with the standard Zend framework installation, whereas previously you could only use the version of AMFPHP bundled with Flextrine.

Functionally speaking things remain exactly the same, and we continue to approach our stable release alongside Doctrine 2.

The new version of Flextrine can be downloaded from [www.flextrine.com](http://www.flextrine.com). Note that if you are upgrading from a previous version of Flextrine you will need to regenerate your AS3 entities.
