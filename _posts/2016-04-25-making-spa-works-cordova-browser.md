---
layout: post
title: Making an SPA that works in Cordova and the browser
categories:
- JS
tags: []
permalink: "/making-spa-works-cordova-browser/"
---

Here is a nice trick if you are trying to develop an app that works consistently across browsers and also in Cordova.  Assuming that your main Javascript bundle is in `js/bundle.js`, this code in your entry HTML file will wait for the `deviceready` event before loading it on Cordova, or otherwise go ahead and load it straight away.

```html
<script>
  // This loads the main Javascript bundle, and will work nicely in the browser and also in Cordova

  function loadJS() {
    var script = document.createElement("script");
    script.src = "js/bundle.js";
    document.body.appendChild(script);
  }

  if (window.cordova) {
    document.addEventListener("deviceready", loadJS);
  } else {
    loadJS();
  }
</script>
```

Note that you want to put this script block at the end of your `body` (or at least after the `cordova.js` script has been loaded).
