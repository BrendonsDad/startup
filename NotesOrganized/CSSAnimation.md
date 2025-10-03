# CSS Animation
You can create animations using the animation properties and defineing keyframes for what the element should look klike at different times in the animation. 

For example, we have a paragraph of cenetered text and we want it to zoom in until its size is 20% of the view height

```css
p {
  text-align: center;
  font-size: 20vh;
}

```

Add the animation name property with a value of demo. This name refers to the keyframes that we will specifify. 

Also add an animation-duration property. 


```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
```

Now, we can create the keyframes.

```css
@keyframes demo {
    from {
        font-size: 0vh;
    }

    to {
        font-size: 20vh;
    }
}

```

To make the animation bounce back:

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```