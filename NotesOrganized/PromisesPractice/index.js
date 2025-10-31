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