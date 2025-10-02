# CSS Selectors

You need to master how to select elements that a CSS rule applies to. 
Selectors in CSS are things like body, h1, section...

```css
h1 {
  border-bottom: thin black solid;
}

section {
  background: #eeeeee;
  padding: 0.25em;
  margin-bottom: 0.5em;
}
```

We want to change the color of the second level headings, but only within the sections for each department. We can use a descendant combinator. 

This example would be all h2 elements that are descendants of section elements

```css
section h2 {
    color: #00400;
}

```

There are other types of cominators you can use, like...

Descenant:
body seciton: any section that is a descendant of body

Child:
section > p: Any p that is a direct child of section

General sibling
div ~ p: Any p that has a div sibling

Adjacent sibling
div + p: Any p that has an adjacent div sibling. 

## Class selector
Make classes that things can share (mulitiple)
select these with a period (.) and then the class name

```css
.summary {
  font-weight: bold;
}
```

you can also combine the element name and class selectors to select all paragraphs with a calass of summary.

```css
p.summary {
  font-weight: bold;
}
```

## ID
Same as class, but this is individual, and instead of using a period, use a hashtag.

```css
#physics {
  border-left: solid 1em purple;
}
```

## Attribute selector
Allows you to select elements based upon their attributes. 

```css
p[class='summary'] {
  color: red;
}
```

## Pseudo Selector
CSS also defines a significant list of pseudo selectors which select based on positional relationsips, mouse interactions, hyperlynk visitation states, and attributes.

Example: suppose we want our purple highlight bar to appear only when the mouse hovers over the text. To accomplish this, change our ID selector to select whenever a section is hovered over.

```css
section:hover {
  border-left: solid 1em purple;
}
```