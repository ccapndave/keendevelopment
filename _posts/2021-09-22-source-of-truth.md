---
layout: post
title: Shared Source of Truth in Phoenix LiveComponents
categories:
- Elixir
tags: []
permalink: "/source-of-truth/"
---

As described in the LiveView [documentation](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveComponent.html#module-liveview-as-the-source-of-truth), stateful components need to be careful about where their _source of truth_ is placed.  There are two options:

 - use the LiveComponent itself as the source of truth
 - use the parent LiveView as the source of truth

This isn't a consideration specific to Phoenix, and needs to be thought about when architecting any component based system.  There are various approaches to manage this; for example, Elm deals with it by only allowing a single source of truth at the top level of the application. React works similarly to LiveView by making a conceptual split between `props` (which is equivalent to the `assigns` parameter in LiveView's `update` callback) and `state` (which is equivalent to `socket.assigns`).

However, for a specific class of components there is an option which hovers somewhere in between:

 - use the parent LiveView to initialise the state and from then on use the LiveComponent as the source of truth

To present an (over)simplified example, lets suppose that you have a component that allows users to make multiple selections from a list of items.  We'll initialize the component with `items` which is a list of items that can be selected and `selected_items` which is the initially selected items.  The pattern below uses the initial value of `selected_items` when the component mounts, and from then on the component maintains its own state.

```elixir
defmodule SelectorComponent do
	use Phoenix.LiveComponent

	@local_assign_keys [:selected_items]

	def render(assigns) do
		# Display the items and listen for clicks
	end

	def mount(socket) do
		socket
		|> assign(initialised?: false)
	end

	def update(assigns, socket) do
		if not socket.assigns.initialised? do
			# On the first update assign everything
			socket
			|> assign(assigns)
			|> assign(initialised?: true)
		else
			# From then on, only assign non-local properties so they don't get overwritten
			socket
			|> assign(Map.drop(assigns, @local_assign_keys))
		end
	end
end
```

#### Is this a good idea?

Very probably not!  In most cases its better to use the parent LiveView as the source of truth by sending `selected_items` back to the LiveView and letting `update` be called normally.  However, if you don't care about the LiveView state being in sync (i.e. when you only care about the DOM produced by the component), you might decide that the encapsulation makes it worthwhile.