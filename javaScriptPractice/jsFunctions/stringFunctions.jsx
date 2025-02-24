// length: The number of characters in the string
// indexOf() The starting index of a given substring
// split() Split the string into an array on the given delimiter string
// startsWith() True if the string has a given prefix
// endsWith() True if the stiring has a given suffix
// toLowerCase() Converts all characters to lowercase

const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: TRUE
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글