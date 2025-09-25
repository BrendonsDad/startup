# HTML media elements
link to the github page
https://github.com/webprogramming260/.github/blob/main/profile/html/media/media.md

HTML elements include img, audio, video , svg, and canvas. 
svg and canvas both contain the code to render a visual image that can even be animated.

## External media
The media tags that reference external media all take a URL as an attribute. The path represented by the URL can either be a relative path or a full path. A full path includes the protocol, domain name, and path to the file. Example:

https://image.pexels.com/photos/164170/pexels-photo-164170.jpeg

A relative path references a file served from the same location as the HTML page rendering the element. 

image/photo.jpg

### Image
To include an image, use the img element and specify the src attribute with the source to the image.

```html
<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />
```

### Audio