// Functions

// In JavaScript functions are first class object. That means that they can be assigned a name, passed a
// parameter, returned as a result, and referenced from an object or array just like any other variable. 

// The basic syntax of a function begins with the function keyword followed by zero or more parameters and
// a body that may conaint zero or more return statements. The return statement may return a single value, 
// Note that there are no type declarations as the type is always inferred by the assignment of the value to
// the parameter. 

function hello(who) {
    return 'hello' + who;
}

console.log(hello('world'));
// OUTPUT: hello world


// Function parameters
// When a function is called, the caller may choose what parameters to provide. If a parameter is not provided
// then the value of the parameter is undefined when the function executes. 
// 
// In addition to explicity passing the value of a aparameter to a function, the function can define a
// default value value. This is done by assigning value to the pareamter in th function declartion

function labeler(value, title='title') {
    console.log(`${title}=${value}`)
}

labeler();
// OUTPUT: title=undefined

labeler('fish');
// OUTPUT: title=fish

labeler('fish', 'animal');
// OUTPUT: animal=fish