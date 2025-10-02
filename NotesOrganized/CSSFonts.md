## CSS Fonts
Do not overlook the importance of choosing the right font. 
Avoid hard to read or overused fonts. This turns users away. 

## Font Families
4 different font families:
Serif, sans-serif, fixed, and symbol.

## Importing fonts
In addition to standard fonts, you can import fonts you provide with your application. 

use @font-face

provide the font name and source location:

```css
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.ttf');
}

p {
  font-family: Quicksand;
}
```

You can also load them from your font provider. Google provides a large selection of open source fonts that you can use without paying royalties. 

The easies way to use Google fonts is to use a CSS import statement to reference the Google Font Service. This will automatically generate the CSS for importing the font.

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```