---
layout: post
title: Getting AMFPHP to turn NaN into null
categories:
- PHP
tags:
- amfbasedeserializer
- AMFPHP
- deserialization
- nan
- not a number
- number
- readDouble
- serialization
permalink: "/getting-amfphp-to-turn-nan-into-null/"
---

Annoyingly the NaN (not a number) value of Number objects in AS3 is often quite hard to translate into a server-side equivalent and ends up breaking AMFPHP, and apparently BlazeDS too.

Here is a simple modification that will make AMFPHP turn NaN into a PHP null value on de-serialization.&#160; Unfortunately on the return journey – trying to return NaN to AS3 – there doesn’t seem to be anything clever that can be done and the Flash Player insists on turning undefined numbers into 0.&#160; A glance through the AMF spec doesn’t reveal anything useful, and if you need this functionality you are best off creating a custom class wrapping the value of the number and including a isNotANumber:Boolean or something that you can examine and set on the server.

Anyway, here’s the code.&#160; In AMFBaseDeserializer.php find the following function:

```php
function readDouble() {
  $bytes = substr($this->raw_data, $this->current_byte, 8);
  $this->current_byte += 8;
  if ($this->isBigEndian) {
    $bytes = strrev($bytes);
  }

  $zz = unpack("dflt", $bytes); // unpack the bytes

  return $zz['flt']; // return the number from the associative array
}
``` 

and change the last line so it reads:

```php
function readDouble() {
  $bytes = substr($this->raw_data, $this->current_byte, 8);
  $this->current_byte += 8;
  if ($this->isBigEndian) {
    $bytes = strrev($bytes);
  } 
  $zz = unpack("dflt", $bytes); // unpack the bytes

  return ($zz['flt'] != 'NAN') ? $zz['flt'] : null; // return the number from the associative array
} 
```

Hope that helps someone!
