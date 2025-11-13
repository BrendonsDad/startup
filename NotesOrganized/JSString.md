# JavaScript String

Strings are a primitive type in Javasctipt. 
Specified by surrounding a sequence fo characters with single quotes, double quotes, or backticks. 
The meaning of single and double quotes are equivalent, but the backtick defines a string literal that may contain JavaScript that is evaluate in place and concatenated into the string.j 

```js
const l = 'literal';
console.log(`string ${l (1 + 1)} text`);
// OUTPUT: string literal2 text
```

## String functions
The string object has several interesting functions associated with it. Here are some of the commonly used ones

length: the number of characters in the string
indexOf() The starting index of a given substring
split() Split the string into an array on the given delimiter string
startsWith() True if the string has a given prefix
endsWith() True if the string has a given suffix
toLowerCase() Converts all characters to lowercase.

```js
const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
```