---
layout: post
title: How to stop SWFs caching in the browser once and for all
categories:
- AS3
tags:
- browser
- browser cache
- cache
- caching
- embed
- flash
- flex
- PHP
- reload swf
- swf
- swfobject
permalink: "/how-to-stop-swfs-caching-in-the-browser-once-and-for-all/"
---

As Flash and Flex developers know all too well, browsers have a habit of caching SWFs so that when you put up a new version it doesn’t always show up on client machines.&#160; There are two classic ways to get around this – either by manually clearing your cache (and telling your clients to do the same) or by appending a random number to the end of the filename as a parameter which is then ignored by the application but fools the browser into thinking that the file has changed.&#160; The first method is unreliable and the second method causes the SWF to reload every time you visit the page (even if it hasn’t changed) which munches up your bandwidth and your time.

As it turns out, there is a third and far superior way!&#160; With a tiny bit of PHP in your embed code you can make browsers refresh the SWF **only** when it has changed.&#160; Note that this uses the [SWFObject](http://code.google.com/p/swfobject/) library, but would work equally well with any embedding method.

```js
swfobject.embedSWF("MySWF.swf?version=<?php echo filemtime('MySWF.swf'); ?>", "myDiv", "100%", "100%", "10.0.0");
```

It works by using the file modification timestamp of the swf as the version number with the result that browsers will refresh their cached copy if and only if you replace the swf with a new version.&#160; Simple and extremely useful!
