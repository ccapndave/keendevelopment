---
layout: post
title: Transforming ArrayCollection data using a map function to keep your view seperated
  in an MVC app
categories:
- AS3
tags:
- arraycollection
- COLLECTION_CHANGE
- databinding
- dataprovider
- filterFunction
- flex
- listcollectionview
- mapFunction
- mate
- MVC
- PureMVC
- robotlegs
- swiz
- transform
- view
permalink: "/transforming-arraycollection-data-using-a-map-function-to-keep-your-view-seperated-in-an-mvc-app/"
---

Last night I was working on a project which involved me having to display large amounts of data in a Flex list.  However, this data needed to be transformed before being displayed.  Let me explain with a simplified example.

## The problem

Suppose we need to display a huge list of Result objects, where a Result object contains a *score *property (lets say it is a Number).  If we just need to display the number then we provide the [ArrayCollection](http://livedocs.adobe.com/flex/3/langref/mx/collections/ArrayCollection.html) of Results as the **dataProvider** to the list and set the **dataField** to ‘score’ and everything is nice and easy.  Now suppose that we need to do some kind of calculation on score – for example, we need to divide it by 2 before displaying it.  Again, this is no problem; we use the **labelFunction** in the list and add a callback function in the MXML file that divides the score by two before returning it:

```as3
private function labelFunction(item:Object):String {
  var result:Result = item as Result;
  return result.score / 2;
}
```

This is all fine.

Now lets suppose that we need to transform the score in a more complicated way – imagine that we are writing some kind of multiuser application and we need to divide the score by the number of users currently logged on to the application before displaying it in the list.  At this point I should point out that I tend to use [PureMVC](http://puremvc.org/) so I will explain this using [PureMVC](http://puremvc.org/) terminology, but its equally applicable to all other MVC frameworks ([Mate](http://mate.asfusion.com/), [Swiz](http://swizframework.org/), [Robotlegs](http://www.robotlegs.org/), etc).

Lets assume that the number of users logged on is in our Model tier; we then have a couple of options on how to go about this:

**Inject the number of users into the view from our mediator and continue to use labelFunction.**

```as3
public var userCount:Number;

private function labelFunction(item:Object):String {
  var result:Result = item as Result;
  return results.score / userCount;
}
```

This is an ok solution – it doesn’t break MVC encapsulation and it works fine.  However, the drawbacks are that we need to monitor when userCount changes and each time re-inject it into the view (and tell the list to update itself).  But the main problem with this is that it gives our view knowledge of something that it shouldn’t know about.

**Extend Result to do the calculation itself**

We can add a getter to Result that does the calculation which means we can get rid of labelFunction in the view and just set dataField to the getter (e.g. **dataField=”transformedScore”**).  But this just moves the problem elsewhere; now the Result object will need to know the number of users; we’d either have to inject it in via a static variable, or give the Result object knowledge of the MVC framework.  This solution is in fact much worse than our first effort.

**Pre-build the ArrayCollection with transformed scores**

In this method we iterate through the Results, doing our calculation on score each time and building up a new dataprovider.  This is fine from an MVC perspective; the view gets its data fully formed in the format it requires, and since the mediator is building the list there is no problem with it querying the model tier.  However, this is a bad solution for other reasons; say that you have 5000 Result objects; the mediator will need to iterate through the entire list before passing the new collection to the view, incurring a nasty performance hit.  Furthermore we will need to rebuild this list entirely if the score or the number of logged in users change.

## The solution

Here, at last, is my solution to the problem.  Like all good solutions it is disarmingly simple :)

```as3
package org.davekeen.collections {
  import mx.collections.IList;
  import mx.collections.ListCollectionView;

  public class MappedListCollectionView extends ListCollectionView {

    public var mapFunction:Function;

    public function MappedListCollectionView(list:IList = null) {
      super(list);
    }

    override public function getItemAt(index:int, prefetch:int = 0):Object {
      if (mapFunction == null) {
        return super.getItemAt(index, prefetch);
      } else {
        return mapFunction(super.getItemAt(index, prefetch));
      }
    }
  }
}
```

MappedListCollectionView extends the normal ListCollectionView (which is the superclass of ArrayCollection) adding a single property – mapFunction – which transforms an item of the array collection into another item.  So now we can do the following in the mediator:

```as3
var mappedListCollectionView:MappedListCollectionView = new MappedListCollectionView(resultsArrayCollection);
       
mappedListCollectionView.mapFunction = function(item:Object):String {
  var userCount:Number = getUserCountFromModel();

  var result:Result = item as Result;
  return result.score / userCount;
}

myView.myList.dataProvider = mappedListCollectionView;
```

I think this is an excellent solution – it maintains encapsulation within the view, it follows Flex standards (in that its syntax is the same as filterFunction), it will work with Flex binding and COLLECTION_CHANGE events and best of all it is high performance as mapFunction is only called for the rows that are actually on the screen.

One thing to bear in mind when using this solution is that Flex databinding will only be triggered when elements of the array collection itself change, so if userCount changes you will need to manually dispatch a COLLECTION_CHANGE event on the array collection.

Hope you find this as useful as I do!
