---
layout: post
title: Using Flex 3 AdvancedDataGrid in FlashDevelop
categories:
- AS3
tags:
- advanceddatagrid
- datavisualization
- datavisualization.swc
- Flex 3
- flex builder 3
permalink: "/using-flex-3-advanceddatagrid-in-flashdevelop/"
---

Those of you attempting to use the new Flex 3 AdvancedDataGrid component in FlashDevelop might have noticed that you are getting the following error:

> Error: Could not resolve <mx:AdvancedDataGrid> to a component implementation.

This is because the AdvancedDataGrid (along with a bunch of other components) are not part of the basic Flex framework, but are provided in an external swc.  Although Flex Builder 3 includes these automatically, FlashDevelop does not so you need to manually include the required components.

To do this take the following steps:

1. Right click on the project root in the Project Manager and select Add->Library Asset...
2. Navigate to the datavisualization.swc file (this will be in Flex Builder 3sdks3.0.0frameworkslibs) and click **Open**
3. Once again click on the project root and select Add->Library Asset...
4. This time navigate to datavisualization_rb.swc (this will be in Flex Builder 3sdks3.0.0frameworkslocaleen_US) and click **Open**

Now you will be able to use AdvancedDataGrid and all other charting components without ever touching Flash Builder 3!

*P.S. If you include datavisualization.swc but forget to include datavisualization_rb.swc you will get the following error:*

> Error: Unable to resolve resource bundle "datamanagement" for locale "en_US".

Hope this helps!
