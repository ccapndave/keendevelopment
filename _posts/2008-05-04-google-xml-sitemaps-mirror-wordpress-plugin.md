---
layout: post
title: Google (XML) Sitemaps Mirror Wordpress Plugin
categories:
- Misc
tags:
- domain mirror
- Google (XML) Sitemaps
- google sitemaps
- multiple sitemaps wordpress
- Wordpress
- wordpress mirrors
- wordpress plugins
permalink: "/google-xml-sitemaps-mirror-wordpress-plugin/"
---

This plugin is a solution for those running both the [Domain Mirror](http://mcaleavy.org/code/domain-mirror/) and the [Google (XML) Sitemaps Generator](http://http://www.arnebrachhold.de/projects/wordpress-plugins/google-xml-sitemaps-generator/) plugins together in Wordpress.  Specifically it extends Google (XML) Sitemaps so that it creates one sitemap for each mirror set up in Domain Mirror.  Sitemaps are created with the mirror URL prepended to the custom filename, so if your two mirrors are [http://www.keendevelopment.ch](http://www.keendevelopment.ch) and [http://www.actionscriptfreelancer.com](http://www.actionscriptfreelancer.com) you'll end up with two site maps called *www.keendevelopment.chsitemap.xml* and *www.actionscriptfreelancer.comsitemap.xml*.  Submit these to Google in the [webmaster](http://www.google.com/webmasters) panel for the appropriate mirrors and you're good to go!

### Download:

![](assets/uploads/2008/05/dl.png)[Download Google (XML) Sitemaps Mirror Plugin](https://www.keendevelopment.ch/files/sitemap-mirror.zip)

### Installation:

Download the zip from the link above and extract into your *wp-content/plugins *directory.  Once you've done this go into your WordPress administration (on any mirror), click on *Plugins* and then click on *Activate* in the **Google XML Sitemaps Mirror **column.  There are no settings or options for this plugin, once it is activated it will automatically start working.  You'll need to click on 'Rebuild the sitemap manually' after installation to generate the site maps for the first time, after which everything should happen automatically.

### Requirements:

This plugin has been tested with:

- Google (XML) Sitemaps Generator for Wordpress 3.0.3.3
- Domain Mirror 1.1
- Wordpress 2.5.1

... but that's not to say it won't work with other version :)  If you try it out and find that it works ok please comment and let me know and I'll add the versions to the supported list.  **This plugin assumes that you have installed and activated both Google (XML) Sitemaps Generator and Domain Mirror.  If you activate this plugin without one or both of these unexpected things may happen!**

### Features:

Nope :)  I created this plugin because I needed it so there are no bells and even fewer whistles.  It does just what it says on the tin.  However, all the normal features of [Google (XML) Sitemaps Generator](http://www.arnebrachhold.de/projects/wordpress-plugins/google-xml-sitemaps-generator/) should work correctly on every mirrored sitemap, including auto-submission of each sitemap to search engines, auto re-generation on posting, etc.

### Support:

I'll probably not be making any updates to the plugin unless I actually require them myself, so its a 'use at your own risk' kind of thing.  If anyone makes any changes to the code that they think may be useful to others please give me a shout and I'll post improved versions up on this page.
