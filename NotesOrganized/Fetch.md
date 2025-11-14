# Fetch
The ability to make HTTP requests from JavaScript is one of the main technologies that changed tthe web from static content pages to one of web applications that fully interact with the user. Microsoft introduced the first API for making HTTP requests from JavaScript with the XMLHttpRequestAPI.

Today, the fetch API is the preferred way to make HTTP requests. The fetch function is built into the browsers JavaScript runtime. This means you can call it from JavaScript code running in a browser. 

The basic usage of fetch takes a URL and returns a promise. The promise then function takes a callback function that is asynchronously called when the requested URL content is obtained. If the returned content is of type application/json you can use the json function on the response to convert it to a JavaScript Object.

The following example makes a fetch request to get and display an inspirational quote. If the request method is unspecified, it defaults to GET.

```js
fetch('https://quote.cs260.click')
    .then((response) => response.json())
    .then((jsonResponse) => {
        console.log(jsonResponse);
    });
```

#### Response
```js
{
    author: 'Kyle Simposon',
    quote: "There's nothing more permanent than a temporary hack."
}
```

To do a post request you populate the options parameter with the HTTP method and headers

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'test title',
        body: 'test body'
        userID: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((jsonResponse) => {
        console.log(jsonResponse);
    });

```