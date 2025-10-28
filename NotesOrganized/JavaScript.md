# JavaScript console
The JavaScript console object provides interaction with the Javascript runtiems debugger console. This usage of console should not be confused with your operating system's console.

### Log
The basic usage of the console object is to output a log message. 

```js
console.log('hello');
// OUTPUT: hello
```

you can even specify CSS declarations in order to style the log output.

```js
console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');
// OUTPUT: JavaScript Demo //in large green text
```

### Timers
If you are trying to see how long a piece of code is running you can wrap it with time and timeEnd calls and it will output the duration between the time and timeEnd calls

```js
console.time('demo time');
for (let i = 0; i < 100000000; i++>) {}
// ... some code that takes a long time. 
console.timeEnd('demo time');
// OUTPUT: demo time: 12.74 ms
```


### Count 
To see how many times a block of code is called you can use the count function. 

```js
console.count('a');
// OUTPUT: a: 1
console.count('a');
// OUTPUT: a: 2
console.count('b');
// OUTPUT: b: 1