---
layout: post
title: AMFPHP, PHP 5.3 and namespaces
categories:
- PHP
tags:
- AMF
- AMFPHP
- amfphp class mapping
- flash remoting
- mapclass
- namespaces
- php 5.3
- php namespace
- value objects
permalink: "/amfphp-php-53-and-namespaces/"
---

I spent a very frustrating day discovering that AMFPHP (trunk) doesn’t support class mapping to PHP classes that exist in the brand new PHP 5.3 namespaces.&#160; So, if you happen to have the following class mapping:

```php
namespace vo;

class User {
  $_explicitType = "vo.User";
}
```

```as3
package vo;

[RemoteClass(alias="vo.User")]
class User {
}
```

… AMFPHP won’t pick up the fact that these are supposed to be the same class and will create an associative array when you send User as a parameter to a service.&#160; It works fine in the opposite direction (i.e. returning User back to AS3 is ok).

I tried out [ZendAMF](http://framework.zend.com/download/amf) and [WebORB for PHP](http://www.themidnightcoders.com/products/weborb-for-php/overview.html), but eventually decided that whilst they definitely have their merits, these frameworks are way too heavyweight for my application; ZendAMF requires the whole Zend Framework stack in order to work and WebORB is 22MB!&#160; Instead I set about patching AMFPHP to support namespaces.&#160; And here it is!

In **amfphp/core/amf/io/AMFBaseSerializer.php** change line 392 to:

```php
$classname = (strstr($typeIdentifier, "/")) ? str_replace("/", "", $typeIdentifier) : substr($mappedClass, $lastPlace);
```

Then if you want to class map to a PHP class in a namespace instead of using . notation, put forward slashes (/).&#160; In fact PHP in its infinite wisdom uses backslashes () to delimit namespaces but as these denote escape characters terrible things happen when we start serializing strings and rather than have to escape the backslash all the time I just plumped for the forward slash.&#160; Therefore our example, which in PHP namespace notation refers to the class **voUser** would change to:

```php
namespace vo;

class User {
  $_explicitType = "/vo/User";
}
```

… and our AS3 class would become:

```as3
package vo;

[RemoteClass(alias="/vo/User")]
class User {
}
```

Tada! AS3 to PHP class mapping working as expected again!
