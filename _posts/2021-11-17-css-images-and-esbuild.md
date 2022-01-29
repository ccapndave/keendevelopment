---
layout: post
title: CSS background images and ESBuild
categories:
- Elixir
tags: []
permalink: "/css-esbuild/"
---

I've been changing a Phoenix project over from using [webpack](https://github.com/webpack/webpack) to using [esbuild](https://github.com/evanw/esbuild) and hit upon an annoying problem; if you have a pre-existing image in `priv/static/images` and you reference it like so:

```css
.someelement {
	background-image: url(/images/myimage.png);
}
```

... then esbuild will complain that it can't find the image.  By fiddling with the paths its possible to get esbuild to find the image as expected, but then it will get bundled into the `priv/static/assets` folder resulting in a duplicate file.

It turns out that what we need to do is to tell esbuild that anything in `/images` should be left how it is and it shouldn't attempt to bundle the files, and we can do that using `external`:

```js
// In the esbuild options:
external: ["images/*"]
```

