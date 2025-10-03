# CSS Grid

This is useful whe nyou want to display a group of child elements in a responsive grid. 

Start with a container with a bunch of child elements. 

```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>

```

Turn this into a repsonsive grid by including a CSS display property with the value of grid on the container element. 

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

We set this to repeatedly define each column to auto-fill the parent element's width with children that are resized to a minimum of 300 pixels and a maximum of one equal fractional unit (1fr) of the parents total width. A fractional unit is dynamically computed by splitting up the parent element's width into equal parts. Next, we fix the height of the rows to be exactly 300 pixels by specifying the grid-auto-rows property. Finally, we finish off the grid configuration by setting the grid-gap property to have a gap of at least 1 em between each grid item.