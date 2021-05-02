---
layout: post
title: Managing ATS in iOS9 Cordova applications
categories:
- Misc
tags:
- ats
- cordova
permalink: "/managing-ats-in-ios9-cordova-applications/"
---

If you are writing a Cordova app and noticed that it stopped working in iOS9, that’s probably because of [Apple Transport Security (ATS)](https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/). This effectively forces all AJAX communication in your Cordova app to be https.

In principle this is a good thing as everyone should of course be using https for remote calls. However, if you develop against a local server with Vagrant or similar, chances are that you aren’t going to be using https.

Therefore you need to add an exception to the project’s app.plist file for your domain. Unfortunately Cordova overwrites this file each time you rebuild the project, so the best way to deal with this is using a hook and a small script that uses plistbuddy to update the file each time. Credit to James in [this thread](http://stackoverflow.com/questions/22769111/add-entry-to-ios-plist-file-via-cordova-config-xml) for this approach.

So, create a file in `<cordova-project>/hooks/after_prepare/configure_ats.sh`, give it execute permissions with `chmod +x` and then use the following file contents, replacing `local.server` with whatever your local server is called.

You can add as many exceptions as you need (even against remote servers, although that’s not recommended and apparently might affect your app being accepted into the App Store).

```bash
#!/bin/bash
PLIST=platforms/ios/*/*-Info.plist

# Bypass ATS for test servers
cat << EOF |
Add :NSAppTransportSecurity:NSExceptionDomains:local.server:NSTemporaryExceptionAllowsInsecureHTTPLoads bool true
EOF

while read line
do
/usr/libexec/PlistBuddy -c "$line" $PLIST
done

true
```