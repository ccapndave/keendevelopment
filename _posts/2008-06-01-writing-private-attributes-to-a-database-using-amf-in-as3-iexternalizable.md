---
layout: post
title: Writing private attributes to a database using AMF in AS3 (IExternalizable)
categories:
- AS3
tags:
- AMF
- AMF3
- AMFPHP
- IExternalizable
- ObjectEncoding
- PHP
- private attributes
- readExternal
- serialize
- serializing
- WebORB
- writeExternal
permalink: "/writing-private-attributes-to-a-database-using-amf-in-as3-iexternalizable/"
---

Yesterday may have been one of the most frustrating days of my entire career.  The brief - simple; take a bunch of classes acting as models (with a single top-level model containing all others in a tree hierarchy) and write their contents to a database.  Client-side technology is Flash CS3 with Actionscript 3, server-side technologies are PHP 5 and MySQL.  After having a look at the problem I decided that the quickest and most elegant way of achieving this would be to use Flash Remoting with [AMFPHP](http://www.amfphp.org/) on the server and to use [custom class mapping](http://www.amfphp.org/docs/classmapping.html) to effectively pass the top level model and all its children to the server so they arrive with the same class structure as they left.

The code to make a Flash Remoting call is pretty standard stuff (note that this assumes the existence of onResult and onFault handlers):

```as3
var myService:NetConnection = new NetConnection();
myService.objectEncoding = ObjectEncoding.AMF0;
myService.connect("http://localhost/amfphp/gateway.php");

var responder = new Responder(onResult, onFault);
myService.call("MyService.write_data", responder, myDataModel);
```

Once I'd implemented this along with a simple AMFPHP service containing the *write_data* function I was surprised to find that no data was getting passed to the server.  After a lot of fiddling around I discovered the reason why:

**By default AMF only encodes public attributes.**

This is pretty annoying since no programmer worth their salt is going to be making all the attributes of their model public.  That's fine, thought I, I'll implement some public getters:

```as3
class MyDataModel {
  private var myInt:uint;
  private var myString:String;

  public function get dbMyInt():uint {
    return myInt;
  }

  public function get dbMyString():String {
    return myString;
  }
}
```

Beautiful.  Except for one thing.

**By default AMF only encodes real attributes.**

So this doesn't work at all - the getters are completely ignored and still no data is passed to the server.

### The 'official' solution

Finally I hit upon the real solution - use the [IExternalizable](http://www.cgdou.net/flash/as3reference/flash/utils/IExternalizable.html) interface to override the default behaviour of the AMF encoder and select what you want to encode/decode.  Note that in order to use this you need to set the object encoding to AMF3 with *myService.objectEncoding = ObjectEncoding.AMF3 *(and you need to use AMFPHP 1.9+ as earlier versions don't support AMF3).

```as3
class MyDataModel implements IExternalizable {
  private var myInt:uint;
  private var myString:String;

  public function writeExternal(output:IDataOutput) {
    output.writeInt(myInt);
    output.writeUTF(myString);
  }

  public function readExternal(input:IDataInput) {
    myInt = input.readInt();
    myString = input.readUTF();
  }
}
```

Perfect, except for one thing... as soon as you implement IExternalizable AMFPHP no longer works, giving the classic NetConnection.Call.BadVersion - and no amount of fiddling seems to fix it.  In desperation I turned to WebORB PHP, but it has the same problem (see [this](http://www.themidnightcoders.com/forum/default.aspx?g=posts&amp;m=1586) forum post) and I didn't have time to properly work out [SabreAMF](http://code.google.com/p/sabreamf/).  From reading around various forums and blogs it appears that IExternalizable works fine with [BlazeDS](http://opensource.adobe.com/wiki/display/blazeds/BlazeDS), but I have seen no reports of it working with anything else.

### A working solution

By this point I'd pretty much given up doing it 'properly'; the job needed to get done and this had taken far too long already.  I created a class that acts as a superclass for all models:

```as3
class SerializableModel {
  public function toObject():Object {
    return new Object();
  }
}
```

By making all classes override this function explicitly adding their private attributes we circumvent the problems with IExternalizable and end up with an associative array on the PHP side which we can iterate through.  Unfortunately this doesn't allow us to map the classes to equivalent PHP classes on the server, but this does at least get the job done.

```as3
class MyDataModel extends SerializableModel {
  private var myInt:uint;
  private var myString:String;
  
  public override function toObject():Object {
    var object:Object = super.toObject();
    
    object.myInt = myInt;
    object.myString = myString;
          
    return object;
  }
}
```

Finally in the remote method call we pass the object constructed by this function using:

```as3
myService.call("MyService.write_data", responder, myDataModel.toObject());
```

### A better solution?

I'd love to hear one!  Please post comments with any suggestions or ideas on how to do this better.  Even better, if anyone knows how to patch AMFPHP 1.9 to accept AMF messages constructed with the IExternalizable interface I would love to see it.
