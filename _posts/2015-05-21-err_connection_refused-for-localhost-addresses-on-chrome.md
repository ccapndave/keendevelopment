---
layout: post
title: ERR_CONNECTION_REFUSED for localhost addresses on Chrome
categories:
- Misc
tags:
- Chrome
- Vagrant
permalink: "/err_connection_refused-for-localhost-addresses-on-chrome/"
---

I run my development environments with a Vagrant VM for each, with each project mapped to **.localhost* in **/etc/hosts**. So I can access *project1.localhost*, *project2.localhost*, etc.

Unfortunately as of yesterday, these addresses all completely stopped working in Chrome, instead giving an **ERR_CONNECTION_REFUSED** message. The strange thing was that I could still access the project directly by IP, and the **.localhost* addresses still worked perfectly in Safari and Firefox.

It actually turns out that this is a new security feature introduced in Chrome 43, which blocks any subdomains of localhost from being accessed from the web. Specifically this means URLs ending with .localhost. You can see an in depth explanation of the issue [here](https://code.google.com/p/chromium/issues/detail?id=378566) and [here](https://code.google.com/p/chromium/issues/detail?id=489973).

The solution is either to use a different browser (but no doubt other browser will also implement this measure at some point), or to simply change your domain names. I have changed everything from **.localhost* to .local* and everything works as normal.
