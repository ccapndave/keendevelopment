---
layout: post
title: Using Catalyst with FlashDevelop
categories:
- AS3
tags:
- ai
- catalyst
- FlashDevelop
- Flex 4
- fxp
- macros
- psd
- skinning
permalink: "/using-catalyst-with-flashdevelop/"
---

Adobe have just released the first version of [Catalyst](http://www.adobe.com/products/flashcatalyst/), a great addition to the Adobe suite which addresses the long-standing annoyances of skinning Flex applications.&#160; Basically Catalyst allows you to take a PSD or AI file, chop it up into Flex components, optionally add some interactions and then export the whole shebang info Flash Builder 4 so you can start coding.&#160; However, Catalyst only wants to save a Flash Builder readable FXP file which is no use for the likes of us who use FlashDevelop.&#160; Luckily it turns out that FXP files are just normal zips of the Flash Builder code tree, so we can extract the assets into a FlashDevelop project using a simple script.&#160; Note that you will need to download [unzip.exe](http://stahlworks.com/dev/index.php?tool=zipunzip) and put it into your path for this to work.

First of all create a folder called ‘fxp’ in the root level of your FlashDevelop project.&#160; Then save your Catalyst project to this project (you can call it anything as long as it has an fxp extension).&#160; Then create a text file, also in the root of your project called **ExtractCatalystProject.bat** and put the following code into it:

```bash
unzip.exe fxp/*.fxp -x html-template/* .* libs/* src/PrivateData.mxml mimetype
```

Now to import the Catalyst project into your application right click on the bat file and choose ‘Execute’.&#160; Every time you make a graphical change in Catalyst run the script again to extract.&#160; Obviously you’ll have to be careful not to make any changes to the generated code in FlashDevelop otherwise it will get overwritten next time you extract.

Obviously this is a very simple solution and there are certainly better ways to do this (C# script macro anyone?), but as a first solution this seems to work ok :)
