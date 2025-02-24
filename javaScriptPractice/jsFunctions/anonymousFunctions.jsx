/*Functions in JavaScript are commonly assigned to a variable so that they can be passed as a
parameter to some other function or stored as an object property. To easily support this common 
use you can define a function snonymously and assign it to a variable.*/

// Function that takes a function as a parameter
function doMath(operation, a, b) {
    return operation(a, b);
}

// Annonymous function assigned to a variable
const add = function (a, b) {
    return a + b;
};

console.log(doMath(add, 5, 3));
//OUTPUT: 8

// Anonymous function assigned to a parameter
console.log(
    doMath(
        function (a, b) {
            return a - b;
        }, 
        5, 
        3
    )
);
// OUTPUT: 2

// You can also use the abbreviated arrow syntax to write an anonymous function. The following is 
// equivalent to the more verbose call demonstrated above. We will dive deeper into arrow functions
// in a later topic. 

console.log(doMath((a, b) => a - b, 5, 3));