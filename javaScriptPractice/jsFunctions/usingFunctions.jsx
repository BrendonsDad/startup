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