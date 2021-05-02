---
layout: post
title: Getting FlashDevelop intellisense code hinting to work with Flash CS3 v3 components
categories:
- AS3
tags:
- add to library
- code hinting
- external library
- flash components
- FlashDevelop
- intellisense
- namespace
- namespaces
- swc
- v3 components
permalink: "/getting-flashdevelop-intellisense-code-hinting-to-work-with-flash-cs3-v3-components/"
---

Just a quick post here in response to a query I recently got from someone.  Since FlashDevelop doesn't have the source of the v3 component set the automatic code-hinting won't work for components like **fl.controls.Button** or whatever.

In order to get FlashDevelop to pick up these classes do the following:

1. In Flash CS3 open the File->Publish Settings... dialog  
2. Click on the *Flash* tab  
3. Select 'Export SWC'  
4. Export your project  
5. In FlashDevelop right-click on the generated swc file and select 'Add to library'  
6. Finally right-click on the generated swc file again, click *Options...* and select 'External library (not included)

Et voila!  Code hinting for all classes contained within the swf.  If you add more components to the movie they should automatically be picked up by Intellisense.

**UPDATE: In fact none of this is necessary - just choosing a Flash IDE project in FlashDevelop links in the appropriate libraries from the start.  Thanks to Philippe for pointing this out!**

On a further note (and in reponse to a question posted on the FlashDevelop forum), if for some reason you are unable to turn off 'Automatically declare stage instances' in Flash and want Intellisense to pick up the objects on the stage you can hack this by re-declaring the instances in a separate namespace.  For example, if you have a TextInput component and a TextField on your stage you could do:

```as3
public class TextEntryView extends Sprite {  
  namespace dummy;

  dummy var textInput:TextInput;
  dummy var textField:TextField;
}
```

Now typing *textField* into the IDE will automatically pop up a list of available properties and methods like usual.
