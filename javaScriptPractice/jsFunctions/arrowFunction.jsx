// This is a function in arrow syntax that takes no parameters and always returns 3.

() => 3;

// The following two invocations of sort are equivalent:
const a = [1, 2, 3, 4]

// standard function syntax
a.sort(function (v1, v2) {
    return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);

// Besides being compact, the arrow function syntax has some important semantic differentces from 
// the standard function syntax. This includes how a return value is specified and the scope of variables
// that an arrow function can access.

// Return Values

/* Arrow functions also have special rules for the return keyword. The return keyword is optional if
   no curly braces are provided for the function and it contains a single expression. In that case the 
   result of the expression is automatically returned. If curly braces are proved then the arrow function 
   behaves just like a standard function. 
*/

() => 3;
// RETURN: 3

() => {
    3;
};
// RETURNS: undefined

() => {
    return 3;
};
// RETURNS: 3


// Closure
/*Next, arrow functions inherit the this pointer from the scope in which they are created. This 
  makes what is known as a closure. A closure allows a function to continue referencing its
  creation scope, even after it has bppassed out of the scope. This can be tricky to wrap your head
  around, but just remember that a closure indcludes a function and its creation scope.

  The function makeClosure returns an anonymous function using the arrow syntax. The function create
  a variable from an initialization parameter. Both the parameter and the locally scoped variables are included
  in  closure for the returned function. 
  */


function makeClosure(init) {
    let closureValue = init;
    return () => {
        return `closure ${++closureValue}`;
    };
}


/*
Now, when we call the createClosure function it returns the arrow function that includes the closure
of the variables that existed when it was created. That is why the closure function can reference a 
variable that is declared outside of the scope that it executes in. We demonstrate this by calling the
closure function multiple times with different resulting values.
 */

const closure = makeClosure(0);

console.log(closure());
//OUTPUT: closure 1

console.log(closure());
//OUTPUT: closure 2

/*Closures provide a valuable property when we do things like execute JavaScript within the scope of 
an HTML page. This is because it remembers the values of variables that were in scope when the function
was created*/


/*
/// USING ARROW FUNCTIONS WITH REACT ///
React components are a great place to learn how to use arrow functions. The following is a simple React
application that increments and decrements a counter when the appropriate buttons are pressed. This code
uses standard JavaScript Functions. 
*/

function App() {
    const [count, setCount] = React.useState(0);

    function Increment() {
        setCount(count + 1);
    }

    function Decrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={Increment}>n++</button>
            <button onClick={Decrement}>n--</button>
        </div>
    );
}

/*
There is however, a problem with this code. Setting state with the function provided by the React
useState function is asynchronous. That means you dont know if other, concurrently running code,has 
changed the value of count between when you read it and when you set it. That can lead to the counter 
being incremented multiple times in some cases or not all in others. To fix this we need to supply an
arrow function to the setCount function that sets the state instead of simply supplying the desired
value. The following compares the two versions.
*/

// may corrupt value
setCount(count + 1);

// safe
setCount((prevCount) => prevCount + 1);

/* This works becuase React can control when the state variable is updated instead of allowing your 
   code to do the read operation. Our counter app now looks like this:
*/

function App() {
    const [count, setCount] = React. useState(0);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>n++</button>
            <button onClick={() => setCount((prevCount) => prevCount - 1)}>n--</button>
        </div>
    )
}

/*
We can get rid of duplicated code by moving the creatigon of the arrow function out of the JSX and 
into a component body.
*/

function App() {
    const [count, setCount] = React.useState(0);

    function counterOpFactory(op) {
        return () => setCount((prevCount) => op(prevCount));
    }

    const incOp = counterOpFactory((c) => c + 1);
    const decOp = counterOpFactory((c) => c - 1);
    const tenXOp = counterOpFactory((c) => c * 10);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={incOp}>n++</button>
            <button onClick={decOp}>n--</button>
            <button onClick={tenXOp}>n*10</button>
        </div>
    );
}