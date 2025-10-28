# JavaScript Destructuring
Process of pulling individual items ou t of an existing one, or removing structure. You can do this with either arrays or objects. This is helpful when you only care about a few items in the original structure. Destructuring is used extensigly within React and so you will need to master this concept in order to build your startup. 

example
```js
const a = [1, 2, 3, 4, 5];

// destructure the first two items from a, into the new variables b and c
const [b, c] = a;

console.log(b, c);
//OUPUT: 1, 2
```

you can do this with objects too, but explicity state wich properties

```js
const o = { a: 1, b: 'animals', c: ['fish', 'cats'] };

const { a, c } = o;

console.log(a, c);
// OUTPUT 1, ['fish', 'cats']
```

### Destructuring in React

React makes extensive use of destructuing when you pass parameters to components and create state. In the example below, React passes all the parameters to the componetnt as an object, but the object is destructured to just the initialCount parameter. Likewise, the return value form React.useState destructures the array to just the variable and the update function


```js
function Clicker({ initialCount }) {
    const [count, updateCount] = React.useState(initialCount);
    return <div onClick={() => updateCount(count + 1)}>Click count: {count}</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clicker initialCount={3} />);
```