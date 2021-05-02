---
layout: post
title: Silverstripe – overview and impressions
categories:
- PHP
tags:
- allowed_children
- cms
- getcmsfields
- MVC
- new zealand
- PHP
- sapphire
- Silverstripe
permalink: "/silverstripe-overview-and-impressions/"
---

I have recently been doing quite a lot of work with [Silverstripe](http://www.silverstripe.org), a new(ish) open-source PHP MVC framework with an integrated CMS developed by a company in New Zealand.  Silverstripe has been gaining some decent support over the last year due to its interface, usability and extensibility.

#### How does it work?

Silverstripe is made up of two elements.  The first, and most important, is [Sapphire](http://www.silverstripe.org/sapphire).  This is a PHP based MVC framework, similar in many ways to Ruby on Rails.  It provides support for views (via a custom templating language), controllers and models.  Models have a number of special static attributes which provide Sapphire with information about the model; for example, which fields should exist in the database for the model and their datatypes are contained in the **$db** attribute, one-to-many relationships are defined in **$has_many**, and many more.  Sapphire then implements a database rebuild task which brings the database up to date with any changes in the code; this can either be run in the browser or from the command line for use in deployment and build scripts.  On a lower level Sapphire’s base Object.php class implements a kind of PHPified mixin system using the concept of extensions.  Unfortunately PHP isn’t really the best language for this kind of thing, but given the limitations and as long as you remember to follow some rules this is a fairly powerful system for extending and decorating objects.

The second part of the system is the Silverstripe CMS module.  This is a web application built on Sapphire (just as any site you create will be another web application built on Sapphire) which implements a very nice AJAX based CMS for your site with a tree on the left hand side and a content area on the right hand side.  The basic CMS is sufficient for most simple sites, but it can be extended hugely using extensions, decorators and plugins.

![Silverstripe](/assets/uploads/2009/12/resizedimage600496silverstripe220screenshot.png)

The CMS module uses the object extension system to add a number of CMS specific special attributes to the model such as **$allowed_children**, **$icon** and **$default_child** which set various properties and permissions on the tree when that particular model is used in the CMS, and you can override **getCMSFields()** in the model to specify which fields are editable for a particular page, what kind of editors to use and which database fields they link to.  For example, the following in a Silverstripe model will create a natty CMS editor with a checkbox, title and HTML editor (using tiny_mce2) which automatically populates and saves to the database.  Nice eh?

```php
static $db = array(
  'YesNo' => 'Boolean',
  'Title' => 'Text',
  'ContentHTMLText' => 'HTMLText',
);

function getCMSFields() {
  $fields = parent::getCMSFields();

  $fields->addFieldsToTab('Root.Content.Main', array(
    new CheckboxField('YesNo', 'Check for yes'),
    new TextField('Title', 'Enter title'),
    new HTMLEditorField('Content')
  ));
}
```

#### Views and the templating language

Sapphire implements its own basic templating language (in *.ss files).  Its quite limited when compared to a more mature product like [Smarty](http://www.smarty.net), but most of the time it is sufficient for what you will need.  You can embed another templates within a template, and access methods in the controller.  Occasionally this forces you to put logic in the controller or model that really belongs in the view, but conversely it stops you overloading your views with logic that doesn’t belong there :)

#### Impressions

Silverstripe is still a fairly young system and there are a few middling to serious problems with it.  Some specific things are problems with using the draft/published versioning system together with has_many relationships, issues with deployment when using staging and live servers, lack of hierarchical URLs and a number of other things that pop up from time to time.  However, we have just deployed a global Flash/HTML solution for a large company with multiple content editors; most of the way has been plain sailing and we never encountered an issue with Silverstripe that couldn’t be worked around one way or another.

In summary Sapphire/Silverstripe is a great piece of software and I recommend it to all web developers everywhere!  Its open source so it will continue to be improved by the community and I have no doubt that Silverstripe’s major problems will be addressed in the next few iterations.  The official ‘Silverstripe book’ has just been released in English which will no doubt help bring the system to a larger market.

Silverstripe (commercial) – [www.silverstripe.com](http://www.silverstripe.com)

Silverstripe (open source) – [www.silverstripe.org](http://www.silverstripe.org)

Silverstripe book (Amazon UK) - [http://www.amazon.co.uk/SilverStripe-Complete-Guide-Development-Wiley/dp/0470681837](http://www.amazon.co.uk/SilverStripe-Complete-Guide-Development-Wiley/dp/0470681837)
