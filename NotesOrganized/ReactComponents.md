# Components
React components allow you to modularize the functionality of your application. 

## Rendering JSX
- One of the primary purposes of component is to generate the user interface. This is done with the JSX returned form a component. 

```jsx
<div>
    Component: <Demo />
</div>

```

Notice that demo is not a valid HTML element. The transpiler will replace this tag with the resulting rendered HTML.

#### React Component

```react
function Demo() {
    cont who = 'world';
    return <b>Hellow {who}</b>;
}
```

#### Resulting HTML

```html
<div>Component: <b>Hello world</b></div>
```

You can use JSX even without a function. A simple variable representing JSX will work anyplace you would otherwise provide a component.

```js
const hello = <div>Hello</div>
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(hello)
```

#### Resulting HTML
```html
<div>Hello</div>
```

The reason in using CSS that you use class name instead of class is becauses class is a keyword in JavaScript. 


```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div>
      <pre className='code'>console.log(1+1);</pre>
      <p>Simple math</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

## Properties

React components also allow you to pass information to them in the form of element properties. The component receives the properties in its constructor and then can display them when it renders. 

#### JSX
```js
<div>Component: <Demo who="Walke" /></div>
```

#### React Components

```jsx
function Demo(props) {
    return <b>Hello {props.who}</b>
}
```

## State
In addition to properties, a component can have internal state. Component state is created by calling React.useState hook function. The useState function returns a variable that contains the current state and a function to update the state. The following example creates a state variable called clicked and toggles the clicked state in the updateClicked funtion that gets called when the paragraph text is clicked.

```js
function App() {
    const [clicked, updateClicked] = React.useState(false);

    function onClicked() {
        updateClicked(!clicked);
    }

    return <p onClick={onclicked}>clicked: {`${clicked}`}</p>
}
    
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);
```

### Reactivity
A component;s properties and state are used by the React framework to determine the reactivity of the interface. Reactivity controls how a compoenent reacts to actions taken by the user or events that happen within the application. Whenever a component's state or properties change, the render function for the component and all of its dependent component render functions are called. 