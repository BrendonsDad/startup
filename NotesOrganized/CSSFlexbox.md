# CSS Flexbox
The flex display layout is useful when you want to partition your application into areas that responsivley move around as the window resizes or the orientation changes. 

Here are some properties you can add with flex:

flex: 0 80px - Zero means it will not grow and 80px means it has a starting basis height of 80 pixels. This creates a fixed size box. 

flex: 1 - One means it will get a fractional unit growth, and since it is the only child with a non zerog growth, it will get all the remaining pace. 

You can also use flex for media queries

```css
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```