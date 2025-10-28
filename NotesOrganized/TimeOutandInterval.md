# Timeout and interval

### setTimeout
it is common to want to delay the execution of someting until after a certain period. JavaScript support this with setTimeout function. setTimeout takes a function that will be called once the given miliseconds delay has bassed. 

```js
setTimeout(() => console.log('time is up'), 2000);

console.log('timeout will happen later');
```

### setInterval
Sometimes you need to execute a block of code periodically at a given time interval. That is where the setInterval function comes into play. setInterval works in a similar manner as setTimeout, however it will continually call the function evertime the delay has passed. 

```js
setInterval(() => console.log('do something'), 1000);
```

you can cancel with clearInterval function

```js
const interval = setInterval(() => console.log('do something'), 1000);

setTimeout(() => clearInterval(interval), 5000);