# Functions
In JavaScript functions are first class objects. That means they can be assigned a name, passed as a parameter, returned as a result, and referenced from an object or array just like any other variable. 

example 
```js
function hello(who) {
    return 'hello ' + who;
}

console.log(hello('world'));
// OUTPUT: hello world
```

A function without a return value usually exist to produce some side effect like modifying a parameter or interacting with an external program. In the following example the side effect of the function is to output text to the debugger console. 

```js
function hello(who) {
    who.count++;
    console.log('hello ' + who.name);
}

hello({ name: 'world', count: 0 });
// OUTPUT: hello world

```

### Function parameters
When a function is called, the caller may choose what parameters to provide. If a parameter is not provided then the value of the parameter is undefined when the function executes. 

In addition to explicityly passing the value of a parameter to a function, the function can define a default value.


```js
function labeler(value, title = 'title') {
    console.log(`${title}=${value}`);
}

labeler();
//OUTPUT: title=undefined

labeler('fish');
// OUTPUT: title=fish

labeler('fish', 'animal');
// OUTPUT: animal=fish

```


### Anonymous Functions
You can define a function anonymously and assign it to a variable

```js
// Function that tkaes a function as a parameter
function doMath(operation, a, b) {
    return operation(a, b);
}

// Anonymous function assigned to a variable
const add = function (a, b) {
    return a + b;
};

console.log(doMath(add, 5, 3));
// OUTPUT: 8


// Anonymous function assigned to a parameter
console.log(
    doMath(
        function(a, b) {
            return a - b
        }, 
        5,
        2
    )
);
// OUPUT: 2
```

YOu can also use abbreviated arrow syntax to write an anonymous function. The following equivalent to the more verbose call demonstrated above. 

```js
console.log(doMath((a, b) => a - b, 5, 3));
```

Some examples of assigning functions to variables, as well as using functions as parameters and return values. 

```js
// Anonymous declaration of the function that is later assigned to a variable
const add = function (a, b) {
  return a + b;
};

// Function that logs as a side effect of its execution
function labeler(label, value) {
  console.log(label + '=' + value);
}

// Function that takes a function as a parameter and then executes the function as a side effect
function addAndLabel(labeler, label, adder, a, b) {
  labeler(label, adder(a, b));
}

// Passing a function to a function
addAndLabel(labeler, 'a+b', add, 1, 3);
// OUTPUT: a+b=4

// Function that returns a function
function labelMaker(label) {
  return function (value) {
    console.log(label + '=' + value);
  };
}

// Assign a function from the return value of the function
const nameLabeler = labelMaker('name');

// Calling the returned function
nameLabeler('value');
// OUTPUT: name=value
```

### Inner Functions
You can also have functions inside of functions

```js
function labeler(value) {
  function stringLabeler(value) {
    console.log('string=' + value);
  }
  function numberLabeler(value) {
    console.log('number=' + value);
  }

  if (typeof value == 'string') {
    stringLabeler(value);
  } else if (typeof value == 'number') {
    numberLabeler(value);
  }
}

labeler(5);
// OUTPUT: number=5

labeler('fish');
// OUTPUT: string=fish
```