/*
JavaScript array objects represent a sequence of other objects and primitives.
You can reference the members of the array using a zero based index. You can 
create an array with the array constructor or using the array literal notation 
shown below.
*/

const a = [1, 2, 3];
console.log(a[1]);
// OUTPUT: 2

console.log(a.length);
// OUTPUT: 3

// push, add an item to the end of an array
a.push(4);

// Remove an item from the end of the array
x = a.pop();

// return a sub-array
a.slice(1, -1);

// Run a function to sort an array in place
a.sort((a,b) => b-a);

// //Creates an iterator for use with a for of loop
// for (i of a.values()) {...};

//Find the first item satisfied by a test function
a.find(i => i < 2);

//Run a function on each array item
a.forEach(console.log);

//Run a function to map an array to a new array 
a.map(i => i+i);

// Run a function to remove items
a.every(i => i < 3);

// Run a function to test if any items match
a.some(i => i < 1);



//EXAMPLE//
const b = [1, 2, 3];

console.log(b.map((i) => i + i));
// OUTPUT: [2, 4, 6]
console.log(b.reduce((v1, v2) => v1 + v2));
// OUTPUT: 6
console.log(b.sort((v1, v2) => v2 - v1));
//OUTPUT: [3, 2, 1]

b.push(4);
console.log(b.length);
// OUTPUT: 4