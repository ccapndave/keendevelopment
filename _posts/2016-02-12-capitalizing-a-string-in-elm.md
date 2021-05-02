---
layout: post
title: Capitalizing a string in Elm
categories:
- Elm
tags: []
permalink: "/capitalizing-a-string-in-elm/"
---

I seem to semi-regularly need a function to capitalize a string in Elm, and this isn't included in either the core String library or NoRedInk's String.Extra. So here is a super simple implementation:

```elm
import String exposing (left, dropLeft, toUpper)

capitalize : String -> String
capitalize str =
  (left 1 >> toUpper) str ++ dropLeft 1 str
```