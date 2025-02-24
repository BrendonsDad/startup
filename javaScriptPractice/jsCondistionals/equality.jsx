// Getting unexpected results is especially common when dealing with the equality operator

console.log(1 == '1');
// OUTPUT: True
console.log(null == undefined);
// OUTPUT: True
console.log('' == false);
// OUTPUT: True

/* Unexpected results happen in JavaScript becuaes it uses complex rules for defining equality that depend
upon the conversion of a type to a boolean value. To remove confusion, JavaScript introduced a strict equality
(===) and inequality (!==) the strict operators skip the typ conversion when computing equality*/

console.log(1 === '1');
// OUTPUT: False
console.log(null === undefined);
// OUTPUT: False
console.log('' === false);
// OUTPUT: False

console.log(('b' + 'a' + +'a' + 'a').toLowerCase());