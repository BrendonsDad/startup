# React
React, and its associated projects, provide a powerful web programming framework. The name react comes from its focus on makeing reactivee web page components that automatically update based on user interactions or changes in underlying data. 

First created by Jordan Walke for use at Facebook in 2011. Used with Facebooks News Feed and then as the main framework for instagram. 

React abstracts HTML into a JavaScript variant called JSX. JSX is vonverted into valid HTML and JAvaScript using a preprocessor such as Vite or Babel. For example, the following is a JSX file. Notice that it mixes both HTML and JavaScript into a single representation. 

```js
cont i = 3;
const list = (
    <ol class='big'>
        <li>Item {i}</li>
        <li>Item {3 + i}</li>
    </ol>
);
```

The preprocessor will convert the JSX into valid JavaScript that looks really complex to a human, but tha ta browser can render without any problems

When the JavaScript interpreter running in the browswer executes the React.createElement functions it will generate HTML elments are displayed to the user.

