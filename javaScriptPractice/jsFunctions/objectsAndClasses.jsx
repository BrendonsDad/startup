/*
A JavaScript object represents a collection of name value pairs referred to as
properties. The property name must be of type String or symbol, but the value 
can be of any type. Objects also have common object-oriented functionality such
as constructors, a this pointer, static properties and functions, and inheritance.

Objects can be created with the new operator. This causes the objects constructor to 
be called. Once declared you can add properties to the object by simply referencing
the property name in an assignment. Any type of variable can be assigned to a property.
This includes a sub-object, array, or function. The properties of an object can be
referenced either with dot (obj.prop) or bracket notation (obj['prop'])
*/

const obj1 = new Object({ a: 3});
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
    console.log('hello');
};

console.log(obj1);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}



/// OBJECT LITERALS ///
/* You can also declare a variable of object type with the object-literal syntax.
This syntax allows you to provide the initial composition of the object.
*/ 

const obj2 = {
    a: 3, 
    b: 'fish',
    c: [1, true, 'dog'],
    d: { e: false }, 
    f: function () {
        return 'hello';
    },
};



///OBJECT FUNCTIONS///
const obj3 = {
    a: 3, 
    b: 'fish', 
};

console.log(Object.entries(obj3));
// OUTPUT: [['a', 3], ['b', 'fish']]
console.log(Object.keys(obj3));
// OUTPUT: ['a', 'b']
console.log(Object.values(obj));
// OUTPUT: [3, 'fish']



/// CONSTRUCTOR ///
/* 
Any function that returns an object is considered a constructor and can be 
invoked with the new operator.
*/

function Person(name) {
    return {
        name: name,
    };
}

const p = new Person('Eich');
console.log(p)
// OUTPUT: {name: 'Eich'}

/*Becuase objects can have any type of property value you can create methods
  on the object as part of its encapsulation
  */

function Person2(name) {
    return {
        name: name,
        log: function () {
            console.log('My name is ' + this.name);
        },
    };
}

const p2 = new Person2('Eich');
p2.log();
// OUTPUT: My name is Eich


/// This Pointer ///
/* 
Notice in the last example the use of 'this'. this referes to the pointer
of the object. 
*/


///     CLASSES     ///
/*
You can use classes to define objects. Using a class clarifies the intent
to create a reusable component rather than a one off object. 
Class declarations look similar to objects but have an explicit constructor 
and assumed function declarations. The person object from above would look 
like the following when converted to a class. 
*/

class Person3 {
    constructor(name) {
        this.name = name
    }

    log() {
        console.log('My name is ' + this.name);
    }
}

const p3 = new Person3('Eich');
p.log();
// OUTPUT: My name is Eich 

/*
You can make properties and functions of classes private by prefixing them 
with a #. 
*/

class Person4 {
    #name;

    constructor(name) {
        this.#name = name;
    }
}

const p4 = new Person4('Eich');
//p4.#name = 'Lie';
//OUTPUT: Uncaught syntax error: private field #name must be declared in the enclosing class



/// INHERITANCE
/*
classes can be extended using the extends keyword to define inheritance. 
Parameters that need to be passed to the parent class are delivered using 
the super function. Any functions defined on the child that have the same 
name as the parent override the parent's implementation. A parent's function
can be explicityly accessed using the super keyword. 
*/


class Person5 {
    constructor(name) {
      this.name = name;
    }
  
    print() {
      return 'My name is ' + this.name;
    }
  }
  
  class Employee extends Person5 {
    constructor(name, position) {
      super(name);
      this.position = position;
    }
  
    print() {
      return super.print() + '. I am a ' + this.position;
    }
  }
  
  const e = new Employee('Eich', 'programmer');
  console.log(e.print());
  // OUTPUT: My name is Eich. I am a programmer