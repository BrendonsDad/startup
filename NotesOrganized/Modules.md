# JavaScript Modules
Modules allow for the partitioning and sharing of code. initially, Javascript had no support for modules. Node.js, a server side JavaScritp execution application, introduced the concept of moduels in order to support the importing of packages of javascript from third party providers. 
JavaScript got fullmodule support with ES6, and they have become the standard module representation as browser support for ES modules is now almost universal. 

Because of the complex history of modules they can be a confusing topic, but it is well worth the time to understand how they work as they are a core piece of a web programmers toolkit. In order to differentiate between the two implementations, Node.js modules are called common js modules and javascript modules are called es modules. The Import and export syntax for ES modules is the major difference between the two formats. 

## common modules
because modules create a file based scope for the code they represent, you must explicityly export the objects formom one file and then import them into a nother file. To import a modules with commonjs you use the format:

```js
const X = require('y');
```

For example, the following imports the express library that was installed using NPM and an object named db that was exported from the local file ./database.js

```js
const express = require('express');
const DB = require('./database.js');
```

If you want to export something from your own code then you would use the module.exports global variable. For example, here is a simple module that exports a function that displays an elert. 


```js
function alertDisplay(msg) {
    alert(msg);
}

module.exports = {
    alertDisplay,
};
```


## ES modules
In order to use ES modules with Node.js you need to specify this in your package.json file as follows

```json
{
    "name": "service",
    "version": "1.0.0",
    "description": "This demonstrates a service for a web application",
    "type": "module",
    "dependencies": {
        "express": "^4.18.2"
    }
}
```

To import a module with ES modules you use the format 
```js
import X from 'y';
```

For example, the following imports the Express package that was installed using NPM.

```js
import express from 'express';
express().listen(3000);
```

If you want to export something from your won code then you would use the export keyword. For example, here is a simple module that exports a funciton that displays an alert

alert.js

```js
export function alertDisplay(msg) {
    console.log(msg);
}
```
You can inport the modules exported function into another module using the import keyword

main.js
```js
import { alertDisplay } from './alert.js';

alertDisplay('called from main.js');
```

## ES Modules in the browser

When you use ES moduels in the browser via html script references, things get a little complicated. The key thing to understand is that modules can only be called from other modules. You cannot access javascript contained in amodule from the global scope that your non module javascript is executing in. 

From your html, you can specify that you are using an es module by including a type attribute with the value of module in the script element. You can then import and use other modules. This is shown in the example below. 

index.html
```html
<script type="module">
    import { alertDisplay } from './alert.js';
    alertDisplay('module loaded');
</script>
```

If we want to use a module in the global scope that our html or other non module javascript is executing in, then we must leak itinto the global scope. we do this by either attaching an event handler or explicityly adding a function to the global window object. in the example below we expose the alertDisplay imported module function by attaching it to the global javascript window object so that it can then be called from the button onnclid andler we also expose the moduel function by attaching a keypress event. 

index.htlm
```html
<html>
    <body>
        <script type="module">
            import { alertDisplay } from './alert.js';
            window.btnClick = alertDisplay;

            document.body.addEventListener('keypress', function (event) {
                alertDisplay('Key pressed');
            });
        </script>
        <button onclick="btnClick('button clicked')">Press me</button>
    </body>
<html>
```

Now if the button is pushed or a key is pressed our es module function will be called.

### ES modules with web frameworks
fortunatly when you use a web froameork bulder discussed in later instuction to generate your web application distrbution code, you usually dont have to worry about differentiaont between global scope and es modules scope. the buynler will inject all the necesasary syntasx ito connect your html to your modules historically this was done by removing the models and placeing all of the javascrpt in a namespaced glbal partition. now that es modules are supported on most browsers, the bndler will exponse the es module directly . 