# Cascading Style Sheets

Css is primarily concerend with defining rulesets or rules.

- Rules have a selector that selects the elements to apply the rule to , and one or more declarations that represent the property to style with the given property value.

- There are three ways to associate CSS with HTML. The first way is to use the style attribute of an HTML element and explicity assign one or more declarations.

```html
<p stye="color:green">CSS</p>
```

The next way is to use the HTML style element within the HTML document. 

```html
  <style>
    p {
      color: green;
    }
  </style>
</head>
<body>
  <p>CSS</p>
</body>
```

The Final way to associate CSS is to use the HTML link element to create a hyperlink reference to an external file containing CSS rules. 

The link appears in the head, like this.

```html
<link rel="stylesheet" href="styles.css" />

```

**styles.css**
```css
p {
    color: green;
}
```

Using link is gernerally preferred.


## Cascading Styles

Elements inherit the rules applied to their parents, so you often end up with the same eclaration property applied to a single element multiple times. 

So you might make the body elements red, the paragraph elements green, and the span elements blue.

```html
<body>
    <p><span style="color:black">CSS</span></p>
```

```css
body {
  color: red;
}
p {
  color: green;
}
span {
  color: blue;
}
```

you can debug in chrome by right clicking and then clicking inspect.

## The box model
CSS defines everything as boxes. 
Innermost box holds content.
Next comes padding, which inherits things like background color. 
Then comes the border which has properties like color, thickness and line style.
The final box is margin.
Margin is considered external to the actual styling of the box, and represents whitespace. 