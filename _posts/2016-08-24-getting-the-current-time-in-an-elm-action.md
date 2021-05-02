---
layout: post
title: Getting the current time in an Elm Action
categories:
- Elm
tags: []
permalink: "/getting-the-current-time-in-an-elm-action/"
---

I often find myself needing to get the current time in an Elm action in order to write something to the model. However, since getting the time is a Task you would normally need two separate `Msg`s in order to implement this.

However, I came up with this little pattern that allows you to do it all in a single action:

```elm
type Msg
  = ActionThatNeedsTime (Maybe Time)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    ActionThatNeedsTime (Nothing) ->
      model !
      [ Task.perform ActionThatNeedsTime ActionThatNeedsTime (Task.map Just Time.now)
      ]

    ActionThatNeedsTime (Just time) ->
      { model | currentTime = time } ! []
```

This uses `Task.map` to turn the result of `Time.now` into a `Maybe`, and since we know that `Time.now` can never fail we can just use the same action for the failure clause of `Task.perform` to save having to define a `Noop`.

Then, in order to use this simply call `ActionThatNeedsTime Nothing` and trust in the update function to retrieve the current time for you.  As an added bonus if you happen to know the time already then you can pass that in directly.
