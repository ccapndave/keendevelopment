---
layout: post
title: Getting the Class of an object in AS3
categories:
- AS3
tags:
- AS3
- class
- forclass
- get class
- getclass
- instanceof
- is
- object
- reflection
permalink: "/getting-the-class-of-an-object-in-as3/"
---

A quick and useful titbit: in order to get the class of an object use the following code:

```as3
static function getClass(obj:Object):Class {
  return Class(getDefinitionByName(getQualifiedClassName(obj)));
}
```

This is great for checking the type of an object.  For example, if you have an object **myObj1** and you want to confirm that it is of the same type as **myObj2** you can write:

```as3
if (myObj1 is getClass(myObj2)) {
  trace("These objects are of the same class!");
}
```