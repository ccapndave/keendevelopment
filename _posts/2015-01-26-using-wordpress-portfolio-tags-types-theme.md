---
layout: post
title: Using Wordpress portfolio tags and types in a theme
categories:
- PHP
tags:
- PHP
- Wordpress
permalink: "/using-wordpress-portfolio-tags-types-theme/"
---

I’ve been using the [Wordpress portfolio feature](https://en.support.wordpress.com/portfolios/) on my blog and website, but it turns out that portfolio tags are dealt with differently from post tags, as they are part of a custom content type with their own taxonomy.  I searched around for the theme code to insert a tag list but the best I could find was [this post](https://wordpress.org/support/topic/display-portfolio-category-and-tags) (which obviously worked at some point), but a bit of database examination showed that the name of the taxonomy must have changed since this post was written, and they are now named *jetpack-portfolio-tag *(and *jetpack-portfolio-type* for the type).

Therefore the code to insert a list of Wordpress portfolio tags into a theme is:

```php
<?php the_terms(get_the_ID(), 'jetpack-portfolio-tag', $before, $separator, $after); ?>
```

using the optional **$before**, **$separator** and **$after** parameters to taste.
