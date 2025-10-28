```js
function Play() {
    // telling react to put in your table this variable which i will use for this play component. 
    // we can also use this to log in and display the user log in. 
    const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
    function countClick() {
        setCount(count + 1);
        localStorage.setItem('count', count + 1)
    }

    return (
        <div className='page'>
            <h1>Play<h1>
            <button onClick={contClick}>Count</button>
            <div>(count)</div>
        </div>
    );
}
```

```js
// lets use local storage to persist who is loging in. 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
function Login(setUser) {
    const [text, setText] = React.useState('');
    const navigate = useNavigate();
    function loginUser() {
        localStorage.setItem('user',text);
        setUser(text);
        navigate('/play');
    }

    function textChange(e) {
        setText(e.target.value)
    }

    return (
        <div className='page'>
            <h1>Login</h1>
            <input type='text' onChange={textChange} />
            <button onClick={loginUser}>Login</button>
        </div>
    );
}
```

```js
//pushing state up

function App() {
    const[user, setUser] = React.useState(localStorage.getItem('user') \\ null);
    return (
        <BrowserRouter>
            <div className='app'>
                <nav>
                    <NavLink to='/'>Login</NavLink>
                    {user && <NavLink to='/play'>Play</NavLink>}
    )
}
```

```js
//websocket messaging place holder
React.useEffect(() => {
    setInterval(() => {
        const names = ['bob', 'sue', 'tim'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCount = Math.floor(Math.random() * 100) + 1;
        const newMsg = `${randomName}: ${randomCount}`;
        setMsg(newMsg);
    }, 1000);
})

```


React keeps a table of state values for every component. React records requested state in the table whenever a updateState method is called. then periodically, React will render every component that has had a change since the last render occured. 

