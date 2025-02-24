// If you are trying to see how long a piece of code is running you can wrap it with time and timeEnd calls 
// and it will output the duration between time and timeEnd calls


console.time('demo time');
for (let i = 0; i < 10000000; i++) {
    2 + 2
}

console.timeEnd('demo time');
// OutPut: demo time: 12.74 ms