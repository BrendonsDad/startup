# Node web service
With JavaScript we can write code that listens on a network port (e.g. 80, 443, 300, or 8080) recieves HTTP requests, processes them, and then responsed. We can use this to create a simple web service that we then execute using Node.js.

First, create your project.

mkdir webservicetest
cd webservicetest
npm init -y


Now create a file named index.js. Paste the following code.

```js
const http = require('http');
const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Hello Node.js! [${req.method}] ${req.url}</h1>`);
    res.end();
});

server.listen(8080, () => {
    console.log(`Web service listening on port 8080`);
})
```

This code uses the Node.js built-in http package to create our HTTP server using the http.createServer function along with a callback function that takes a request (req) and a response (res) object. That function is called whenever the server receives an HTTP request. In our example, the callback always returns the same HTML snippet, with a status code of 200, and a content-type header, no matter what request is made. Basically this is just a simple dynamically generqted HTML page. A real web service would examine the HTTP path and return meaningful content based upon the purpose of the endpoint. 

The server.listen call statrs listening on port 8080 and blocks until the program is terminated. 

We execute the program by going to our console window and running Node.js to execute our index.js file. If the service stats up correctly then it should look like the following. 