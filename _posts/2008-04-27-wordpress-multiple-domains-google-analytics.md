---
layout: post
title: Wordpress, multiple domains & google analytics
categories:
- PHP
tags:
- domain mirror
- ultimate google analytics
- Wordpress
permalink: "/wordpress-multiple-domains-google-analytics/"
---

So why not start here with a few things I discovered whilst getting this site going. This is my first time doing anything properly with [Wordpress](http://wordpress.org) and it gets the big thumbs up from me, speedy deployment, fairly easy to fiddle with and loads of plugins to play with.

Anyway, I managed to get hold of both [www.actionscriptfreelancer.com](http://www.actionscriptfreelancer.com) and [www.keendevelopment.ch](http://www.keendevelopment.ch) which I'm hoping will push up my ratings in search engines for these keywords, so the first problem was getting two domains to point to a single Wordpress installation. This turned out to be easily accomplished using the [Domain Mirror](http://mcaleavy.org/code/domain-mirror/) plugin and changing the tagline slightly in each site should prevent Google penalizing them as duplicates (I hope). Then it was time for some Google Analytics provided courtesy of the [Ultimate Google Analytics](http://wordpress.org/extend/plugins/ultimate-google-analytics/) plugin.

However I hit a slight problem here as UGA only allows a single GA account id to be entered, but GA provides two seperate ids for the .com and .co.uk address. Time for a bit of PHP coding; I updated the Domain Mirror plugin so that you can also enter a GA account id for each domain, and then updated the Ultimate Google Analytics plugin so that it uses the account id for the current domain. Note that in order to get these two to work you'll need to add a column to the **wp_options** table called *googleid*.

Download the two plugins as a zip [here](http://freelance.localhost/wp-content/uploads/2008/04/plugins.zip)!
