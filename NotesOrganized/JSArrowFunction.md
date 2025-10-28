# JavaScript Arrow Function
Becuase functions are first order objects in JavaScript they can be declared anywhere and passed as paramters. This results in code with lots of anonymous functions clutering things up. To make the code more compact the arrow syntax was created. This replaces the need for the function keyword with the symnols => placed after the parameter declaration. 

This is a function in arrow syntax that takes no parameters and always returns 3.

```js
() => 3;
```

The following two invocations of sort are equivalent

```js
const a = [1, 2, 3, 4];

//standard function syntax
a.sort(function(v1, v2) {
    return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```

## Using arrow functions with React
React components are a great place to learn how to use arrow functions. The following is a simple React application that increments and decrements a counter when the appropriate buttons are pressed. This code uses standard JS functions

```js

function App() {
    const [count, setCount] = React.useState(0);

    function Increment() {
        setCount(count + 1);
    }

    function Decrement() {
        setCount(count -1);
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={Increment}>n++</button>
            <button onClick={Decrement}>n--</button>
        </div>
    )
}
```

By using arrow function the counter logic can be moved directly into the JSX. This makes the code much more concise and actually clarifying what the buttons are doing

```js
function App() {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount((prevCount) => prevCount +1)}>n++</button>
            <button onClick={() => setCount((prevCount) => prevCount -1)}>n--</button>
    )
}
```

Best way to do it

```js
function App() {
  const [count, setCount] = React.useState(0);

  function counterOpFactory(op) {
    return () => setCount((prevCount) => op(prevCount));
  }

  const incOp = counterOpFactory((c) => c + 1);
  const decOp = counterOpFactory((c) => c - 1);
  const tenXOp = counterOpFactory((c) => c * 10);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incOp}>n++</button>
      <button onClick={decOp}>n--</button>
      <button onClick={tenXOp}>n*10</button>
    </div>
  );
}
```