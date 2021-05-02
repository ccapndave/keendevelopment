---
layout: post
title: Using Flow, Babel and gulp to type-check ES6 code (with sourcemaps)
categories:
- JS
tags: []
permalink: "/flow-babel-gulp-es6/"
---

TL;DR - this post shows a method to use Flow, Babel and Gulp to transpile and type-check ES6 code, with support for sourcemaps in the resulting messages.

### Babel, flow

A lot of the annoyances of developing with Javascript are starting to go away. In particular, ES6 has removed a lot of the fluff from JS and made the language a lot more elegant and fun to code in.

The final missing piece of the Javascript puzzle are types. Javascript's dynamic typing is both a strength and a weakness - its extremely expressive and powerful, allowing for very a lot of interesting abstractions. At the same time, things are **so** flexible that its very easy to shoot yourself in the foot without realising it.

### Flow, babel

The boffins at Facebook have come to the same conclusion and have been working on [Flow](http://flowtype.org/), which is a static typechecker for Javascript. I find it very nice for a number of reasons, including these:

- You turn it on for a particular file using a `/* @flow */` annotation. This means that you can implement typing bit by bit, and if a particular file is very dynamic then there is no need to type it at all.
- Similarly to Typescript (and in stark constrast to Java-style languages) you can use [structural types](http://en.wikipedia.org/wiki/Structural_type_system) for objects. This means that you can say that some function requires an object with property `name` and function `sayHello`. This means that *any* object satisfying these requirements can be passed into the function, whatever other properties it might have. This is at the heart of duck-typing and gives us the flexibility of dynamic typing along with some of the safety of strict typing.
- Flow commands and annotations can be put into comment blocks meaning that they don't cause your IDE to plaster your code with red squiggly lines.
- And finally, it runs some kind of caching server which means that once it has warmed up it runs very fast!

### Putting it all together

My goal was to integrate flow typechecking into my build process (in my case this is gulp, but I am sure that the techniques here can be ported to grunt or whatever else you might be using). Here is my final `gulpfile.js` showing the `flow` and `flow:watch` tasks.  Note that this assumes that your ES6 source code is in a directory called `src`.

```js
var gulp = require("gulp"),
  notify = require("gulp-notify"),
  babel = require("gulp-babel"),
  flow = require("gulp-flowtype"),
  sourcemaps = require("gulp-sourcemaps"),
  sourcemapReporter = require("jshint-sourcemap-reporter");

var clientSrcDir = "src",
  flowDest = "tmp_build_flow";

gulp.task("flow:babel", function (cb) {
  gulp
    .src(clientSrcDir + "/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel({ blacklist: ["flow"] }))
    .on("error", notify.onError("<%= error.message %>"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(flowDest))
    .on("end", cb);
});

gulp.task("flow", ["flow:babel"], function () {
  gulp
    .src(flowDest + "/**/*.js")
    .pipe(
      flow({
        all: false,
        weak: false,
        killFlow: false,
        beep: true,
        abort: false,
        reporter: {
          reporter: function (errors) {
            return sourcemapReporter.reporter(errors, {
              sourceRoot: "/" + clientSrcDir + "/",
            });
          },
        },
      })
    );
});

gulp.task("flow:watch", function () {
  gulp.watch(clientSrcDir + "/**/*.js", ["client:flow"]);
});
```

`gulp-flowtype` is a gulp plugin that runs flow as part of a gulp pipeline.  It can be installed from npm using:

```bash
npm install gulp-flowtype --save
```

I have also built a simple reporter that supports sourcemaps. Furthermore if you happen to be using IntellJ or WebStorm and run the task through the builtin **Gulp** runner you should be able to click on the error messages from gulp and be taken directly to the position in the original, un-transpiled, file. Install the reporter with:

```bash
npm install jshint-sourcemap-reporter --save
```

Finally it is necessary to add the ES6 transpilation directory to Flow's source, and to ignore the ES6 source directory by editing the `.flowconfig` (created when you run `flow init`).  Therefore this should read:

```config
[ignore]
.*/src/.*

[include]
./build_flow

[libs]

[options]
```

Note that if you fancy you can extends this pipeline further to do browerifying, concatentation, uglfying, etc, but personally I leave these tasks like this and have separate tasks for other purposes.
