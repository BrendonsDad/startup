# React Hooks
React hooks allow react function style components to be able to do everything that a class style component can do and more. 

The useEffect hook allows you to represent lifecycle events. For example, if you want to run a function everytime the comonent completes rendering, you could do the following. 

```js
function UseEffectHookDemo() {
    React.useEffect(() => {
        console.log('rendered');
    });

    return <div>useEffectExample</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UseEffectHookDemo />);