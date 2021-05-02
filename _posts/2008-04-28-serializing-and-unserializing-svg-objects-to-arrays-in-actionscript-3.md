---
layout: post
title: Serializing and unserializing SVG objects to arrays in Actionscript 3
categories:
- AS3
tags:
- ByteArray
- decode
- encode
- readByte
- registerClassAlias
- SVG
- writeByte
permalink: "/serializing-and-unserializing-svg-objects-to-arrays-in-actionscript-3/"
---

Some time ago I was working on a project, part of which involved the development of an Actionscript 3 SVG parser that could read Illustrator generated files and turn them into a list of custom Circle, Polyline and Line objects (more details on the specifics of this coming in a later article).

However, when the SVG file was large, i.e. > 1MB, the parser can easily end up taking 10 seconds or more to generate these objects which is far from ideal.&#160; So I got to thinking that since my SVG file was defined at compile time and remained constant, perhaps there was a way to serialize the generated objects, stuff them into a class, and then deserialize them at runtime.

Enter [ByteArray](https://livedocs.adobe.com/flex/2/langref/flash/utils/ByteArray.html) Using this class we can take any object and **serialize** it into an array with a simple function:

```as3
function encode(object:*):Array {
  var bytes:ByteArray = new ByteArray();
  bytes.writeObject(object);
  bytes.position = 0;

  var bytesArray:Array = new Array();

  for (var n:uint = 0; n < bytes.length; n++)
    bytesArray.push(bytes.readByte());

    return bytesArray;
}
```

And to **unserialize** the array back into an object we use the opposite version of the function:

```as3
function decode(array:Array):* {
  var bytes:ByteArray = new ByteArray();

  for (var n:uint = 0; n < array.length; n++)
    bytes.writeByte(array[n]);

  bytes.position = 0;

  return bytes.readObject();
}
```

This means that rather than using the parser at run-time, we instead run it beforehand and generate a bunch of arrays with the **encode** function (either writing them to a file, or hard-coding them into a class) and then call **decode** on this file at run-time hence missing out on a big chunk of processing time.

There is one proviso to this - if you are using packages you'll need to specifically tell the AS3 compiler to map these packages to their associated classes using [registerClassAlias](https://livedocs.adobe.com/flex/2/langref/flash/net/package.html#registerClassAlias()).

For example, if one of the classes that you have encoded is 'com.myproject.shapes.Circle' then before using the decode function you will need to map the class in the constructor in the constructor.&#160; The following code sample demonstrates all of this by mapping an object name, creating the object, encoding it and the decoding it:

```as3
package com.myproject.factories {

  import flash.net.registerClassAlias;
  import com.myproject.shapes.Circle;

  public class CircleFactory {
    registerClassAlias("com.myproject.shapes.Circle", Circle);

    var circle:Circle = new Circle();

    var encodedCircle:Array = encode(circle);
    var decodedCircle:Circle = decode(encodedCircle);
  }
}
```

Et voila! Obviously this is no good if your input file changes at runtime, or is uploaded by the user, but for static files this is a great way to save on valuable processing time.  Although I haven't tried this, it should also be possible to use this method to save structured OO data quickly if you don't have the time or requirement to serialize to XML or another standard.
