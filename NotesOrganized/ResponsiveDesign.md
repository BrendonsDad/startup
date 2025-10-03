# Responsive Design
Modern Web apps are expected to run well on all kinds of devices, like phones, desktops, laptops, shopping kiosks, car dashboards, and much more. 

## Display

none: dont dispaly this element: the element exists, but the browser will not render it.

block: Display this element with a width that fills its parent element. A p or div element has block display by default.

inline: Display this element with a width that is only as big as its content. A b or span element has inline display by default.

flex: Display this element's children in a flexible orientation.
grid: Display this elements children in a grid orientation. 

example code: 

```css
.none {
  display: none;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
  flex-direction: row;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```


## Viewport meta tag

mobile browsers automatically started scaling the website so that it looked better on a small screen. 

This can get in the way. Include this meta tag in the head element of your HTML

```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

## Float
The float property moves an element to the left or right of its container element and allows inline elements to wrap around it. 

Choose things like right, left. 

## Media Queries
@media selecter are esssential for responsiveness. 

For example, you can use the @media selector to tell us which side of the screen is the longest. A media query takes on e or more predicates separated by boolean operators. 

```css
@media (orientation: portrait) {
    div {
        transform: rotate(270deg);
    }
}
```

You can also use media queries to make entire pecies disappear

```css
@media (orientation: portrait) {
  aside {
    display: none;
  }
}
```