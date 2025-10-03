# CSS Frameworks

Shared packages of code. 

The biggest ones are bootstrap and tailwind

You can integrate Bootstrap into your web applications simply by referencing the Bootstrap CSS files from their content dilivery network. You then add the HTML link elements to your head element like this. 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
  </head>
  <body>
    ...
  </body>
</html>
```

to include Bootstraps JavaScript module, add this element following the end of your HTML body element. 

```html
<body>
  ...

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
```

This codepen (https://codepen.io/leesjensen/pen/JjZavjW) demeos the use of all major bootstrap components. 