---
layout: post
title: ES6 with system.js not recognised
categories:
- JS
tags: []
permalink: "/es6-system-js-not-recognised/"
---

I’m investigating using [system.js](https://github.com/systemjs/systemjs) with [jspm](http://jspm.io/) for my next project so that I can use some ES6 goodness. All was happy and well with my tests, when without warning the browser simply stopped recognising a file as being ES6.  After much fiddling about I eventually figured out what was going on and have included the solution here in case anyone else gets bitten.

It turns out that the problem is that as of the current master branch system.js uses a regular expression to detect whether a file is ES6 or not ([https://github.com/systemjs/systemjs/blob/99e547700201a7c55c262907238048ab904a5dd4/lib/extension-es6.js#L34](https://github.com/systemjs/systemjs/blob/99e547700201a7c55c262907238048ab904a5dd4/lib/extension-es6.js#L34)) and if you happen to be testing with a simple file like:

```js
let es6 = "ES6";

console.log(`Hello ${es6}`);
```

then its not going to be recognised as being ES6 by system.js, instead throwing an error on the **let** statement.

A solution is to add a dummy export at the end of the file, which matches the regular expression and lets system.js work as intended.

```js
let es6 = "ES6";

console.log(`Hello ${es6}`);

export default {}
```

After figuring this out I eventually found a closed issue at https://github.com/systemjs/systemjs/issues/301 which mentions this same solution. It also says that you can include "format es6" at the top like this:

```js
"format es6"

let es6 = "ES6";
console.log(`Hello ${es6}`);
```

but I have to say that this didn't work for me (although there were no errors thrown, nothing was written to the console.
