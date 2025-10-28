# Local Storage
The browser's localStorage API provides the ability to persistently store and retrieve data on a users browser acrsoss user seessions and HTML page renderings. 

### How to use LocalStorage
There are four main functions that can be used with localStorage
setItem(name, value), getItem(name), removeItem(name), clear()

A local storage value must be of type string, numer, or boolean. If you want to store a JavaScript object or array, then you must first convert it to a JSON string with JSON.stringify() on insertion, and parse it back to JavaScript with JSON.parse() when retrievved. 

