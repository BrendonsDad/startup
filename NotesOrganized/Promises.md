# Promises
The rendering process of your HTML executes on a single thread. That means that you cannot take a long time processing JavaScript on the main rendering thread. Long running, or blocking tasks, should be executed with the use of a JavaScript Promise. The execution of a promise allows the main rendering thread to continue while some action is executed in the background. You create a promise by calling the promise object constructor and passing it an executor function that runs the asynchronous operation. Executing asynchronously means that promise constructor may return before the promise executor function runs. The state of the promise execution is always in one of three possible states.

1. pending - currnetly running asynchronously
2. fulfilled - completed successfully
3. rejected - failed to complete

We can demonstrate asynchronous execution by using the standard javaScript setTimeout function to create a delay in the execution of the code. the setTimeout function takes a number of milliseconds to wait and a function to call after that amount of time has expired. 


```js
const delay = (msg, wait) => {
    setTimeout(() => {
        console.log(msg, wait);
    }, 1000 * wait)
}; 

new Promise((resolve, reject) => {
    // Code executing in the promise
    for (let i = 0; i < 3; i++) {
        delay('inPromise', i);
    }
});

// Code executing after the promise
for (let i = 0; i < 3; i++) {
    delay('After promise', i);
}

// OUTPUT:
//   In promise 0
//   After promise 0
//   In promise 1
//   After promise 1
//   In promise 2
//   After promise 2
```

## Resolving and rejecting
Now that we know how to use a promise to execute asynchronously, we need to be able to set the state to fulfilled when things complete correctly, or to rejected when an error happens. The promise executor function takes two functions as parameters, resolve and reject. Calling resolve sets the promise to the fulfilled state and calling reject sets the promise to the rejected state. 

consider the following 'coin toss' promise that waits ten seconds and  then has a fifty percent chance of resolving or rejecting

```js
const coinToss = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve('success');
        } else {
            reject('error');
        }
    }, 10000);
});
```

## Then, catch, finally
With the ability to asynchronously execute and set the resulting state, we now need a way to generically do something with the result of a promise after it resolves. This is done with functionality similar to exception handlin. The promise is fulfilled, catch is called if the promise is rejected, and finally is always called after all the processing is completed. 

altering the previous code
```js
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});
```

We then chain the then, catch and finally functions to the coinToss object in order to handle each of the possible results.

```js
coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```