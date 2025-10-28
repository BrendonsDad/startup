# JavaScript Object and classes
A JavaScript object represents a collection of name value pairs reffered to as properties. The property name must be of type string or symbol, but the value can be of any type. Objects also have common object oriented functionality such as construcors, a this pointer, static properties and functions and inhertiance.


can be created with the new operateor. 
you can add properties by simply referencing the property name in an assignment. 

```js
const obj = new Object({ a: 3 });
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
    console.log('hello');
};

console.log(obj);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}

```

### Object literals 
You can also declare a variable of object type with the object-literal syntax. This syntax allows you to provide the initial composition of the object. 

```js
const obj = {
    a: 3, 
    b: 'fish',
    c: [1, true, 'dog'], 
    d: { e: false }, 
    f: function () {
        return 'hello';
    },
};

```

### Object functions
common ones
entries: returns an arraw of key value pairs
keys: returns an array of keys
values: returns an array of values

```js
const obj = {
  a: 3,
  b: 'fish',
};

console.log(Object.entries(obj));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']
```

### Constructor
Any function that returns an object is considered a constructor and can be invoked with the new operator.

```js

function Person(name) {
    return {
        name: name,
    };
}

const p = new Person('Eich');
console.log(p);
// OUPUT: {name: 'Eich'}

```


### Classes
```js
class Person {
  constructor(name) {
    this.name = name;
  }

  log() {
    console.log('My name is ' + this.name);
  }
}

const p = new Person('Eich');
p.log();
// OUTPUT: My name is Eich
```

You can make properties and functions of classes private by prefixing them with a #

```js
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }
}

const p = new Person('Eich');
p.#name = 'Lie';
// OUTPUT: Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class
```

### Inheritance
Classes can be extended by using the extends keyword to define inheritance.

```js
class Person {
    constructor(name) {
        this.name = name;
    }
    print() {
        return 'My name is ' + this.name;
    }
}

class Employee extends Person {
    constructor(name, position) {
        super(name);
        this.position = position
    }

    print() {
        return super.print() + '. I am a ' + this.position;
    }
}

const e = new Employee('Eich', 'programmer');
console.log(e.print());
// OUPUT: My name is Eich. I am a programmer.
```