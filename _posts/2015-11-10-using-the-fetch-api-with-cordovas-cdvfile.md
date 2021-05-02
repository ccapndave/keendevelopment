---
layout: post
title: Using the Fetch API with Cordova's cdvfile
categories:
- JS
tags:
- Cordova
- Crosswalk
permalink: "/using-the-fetch-api-with-cordovas-cdvfile/"
---

Today I discovered a strange problem; my Cordova application, which uses the new [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) was working fine on iOS, but was failing on Android (with Crosswalk).

It turns out that the error was coming from the Fetch API which was saying `URL scheme must be "http" or "https" for CORS request.`. Manually setting the mode to `no-cors` with `fetch(path, { mode: 'no-cors' })` gives the error `URL scheme "cdvfile" is not supported.`.

So it seems that the native Fetch API in Chrome doesn't like the `cdvfile` schema, but the [polyfill](https://github.com/github/fetch) loads it happily.

Therefore as an ugly but workable hack, simply throw away the native implementation before loading the polyfill to ensure that Android also uses the polyfilled version!

```js
window.fetch = null;

require("whatwg-fetch");
```