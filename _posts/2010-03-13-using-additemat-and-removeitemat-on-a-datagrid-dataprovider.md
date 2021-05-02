---
layout: post
title: Using addItemAt and removeItemAt on a DataGrid dataprovider
categories:
- AS3
tags:
- additemat
- arraycollection
- databinding
- datagrid
- flex
- icollectionview
- ilist
- listcollectionview
- removeitemat
- sorting
permalink: "/using-additemat-and-removeitemat-on-a-datagrid-dataprovider/"
---

According to the notes buried deep within the Flex documentation:

> *If you use the ICollectionView interface to sort or filter a collection, do not use the IList interface to manipulate the data, because the results are indeterminate.*

This means that if you are using an ArrayCollection as the dataprovider of a sortable component (e.g. a DataGrid), sort the columns and then try and use `addItemAt()` or `removeItemAt()` elsewhere in your application you will be entering a world of pain; the wrong items will be added/deleted in the datagrid, rows might get duplicated in strange way, etc.

The reason for this is that sorting the datagrid is changing the ListCollectionView of the original ArrayCollection which affects subsequent index based operations.

Luckily there is a simple solution; give the component its own personal ListCollectionView:

```as3
dataGrid.dataProvider = new ListCollectionView(arrayCollection);
```

This preserves IList integrity on the original collection which means that databinding should work as expected.
