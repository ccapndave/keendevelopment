---
layout: post
title: Implementing preventDefault on an Elm click listener
categories:
- Elm
tags: []
permalink: "/implementing-preventdefault-on-an-elm-click-listener/"
---

Every now and again, an `onClick` Elm listener will result in the browser changing the page. I'm not quite sure why this only happens occasionally with some buttons, but here is a workaround that implements a new listener that enforces `preventDefault`, stopping this from happening:

```elm
onClickPreventDefault : Signal.Address a -> a -> Attribute
onClickPreventDefault address msg =
  onWithOptions "click" { preventDefault = True, stopPropagation = True } JD.value (\_ -> Signal.message address msg)
```

It can be used as a drop in replacement for `onClick`.
