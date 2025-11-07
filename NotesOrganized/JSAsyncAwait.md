# JavaScript Async/await
JavaScript promise objects are great for asynchronous execution, but as developers began to build large systems with promises they started wanting a more concise representation. This was provided with the introduction of the async/await syntax. The await keyword wraps the execution of a promise and removed the need to chain functions. The await expression will block until the promise state moves to fulfilled or throws an exception if the state moves to rejected. For example, if we have a function that returns a coin toss promise.

```js
const coinToss = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve(Math.random() > 0.5 ? 'heads' : 'tails');
            } else {
                reject('fell of table')
            }
        }, 10000);
    });
};
```

We can create equivalent executions with either a promise then/catch or an awaite with a try/catch block

###### then/catch chain version
```js
coinToss()
    .then((result) => console.log(`Toss result ${result}`))
    .catch((err) => console.log(`Error:  ${err}`))
    .then(() => console.log(`Toss completed`))
```

###### async, try/catch version
```js
try {
    const result = await coinToss();
    console.log(`Toss result ${result}`);
} catch (err) {
    console.error(`Error: ${err}`);
} finally {
    console.log(`Toss completed`);
}
```

## async
ONe important restriction for working with await is that you cannot call awaite unless it is called at the top level of JavaScript, or is in a function that is defined with tthe async keyword. Applying the async keyword transforms the function so that it returns a promise that will resolve to the value that was preiously returned by the function. Basically this turns any function into an asynchronous function, so that it can in turn make asynchronous requests. 