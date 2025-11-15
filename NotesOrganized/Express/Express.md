# Express
In the previous instruction you saw how to use Node.js to create a simple web server. This works great for little projects where you are tryting to quickly serve up some web content, but to build a production-ready application you need a framework with a bit more functionality for easily implementing a full web service. This is where the Node package Express comes in. Express provides support for
1. Routing requests for service endpoints
2. manipulating HTTP requesst with JSON body content
3. Generating HTTP responses
4. Using middleware to add functionality. 

Everything in express revolves around creating and using HTTP routing and middleware functions.  You create an express application by using NPM to install the express package and then calling the express constucotr to creat he express app and listen for http requests on a desired port

## Defining Routes
HTTP endpoints are implemented in Express by defining routes that call a function based upon an HTTP path. The Express app object supports all of the HTTP verbs as functions on the object. For example, if you want to have a route function that handles an HTTP GET request for the URL path /store/progo you would call the get method on the app

```js
app.get('/store/provo', (req, res, next) => {
    res.send({ name: 'provo' });
});
```

The get function takes two parameters, a URL path matching pattern, and a callback function that is invoked when the pattern matches. The path matching parameter is used to match against the URL path of an incoming HTTP request. 

The callback function takes two parameters, a URL path matching pattern, and a callback function that is invoked when the pattern matches. The path matching parameter is used to match against the URL path of an incoming HTTP request. 

The callback function has three parameters that represent the HTTP request object (req), the HTTP response object (res), and the next routing functino that express expects to tbe called if this routing function wants another function to generate a response. 

The Express app compares the routing function patterns in the order that they are added to the Express app object. So if you have two routhing functions with patterns that both match, the first on ethat was added will be called and given the next matching function in the next parameter.

In our example above we hard coded the store name to be provo. A real store enpoint would allow any store name to be provided as a parameter in the path Express supports path parameters by prefixing the parameter name with a colon ( : ). Express creates a map of path parameters and populates it with tehe matching values found in the URL path. You then reference the parametersusing the req.params object. Using this pattern you can rewrite our getStore enpoint as follows. 

```js
app.get('/store/:storeName', (req, res, next) => {
    res.send({ name: req.params.storeName });
});
```

ruinning our javascript using node we can see the result when we make an http request using curl

curl localhost:8080/store/orem

{"name":"orem"}

## Using middleware
The standard mediator/middleware design pattern has two pieces: a mediator and middleware. Middleware represents componentized pieces of functionality. The mediator loads the middleware components and determines their order of execution. When a request comes to the mediator it then passes the request around to the middleware components. Following this pattern, epxress is the mediator, and middleware functions are the middleware components. 

Express comes with a standard set of middleware functions. These provide functionality like routing, authentication, CORS, sessions, serving static web files, cookies and logging. Some middleware functions are provided by default and other ones must be installed using NPM before you can use them you can also write your own middelware functions and use themn with express. 

Middleware always has this format

```js
function middlewareName(req, res, next)
```

The middleware function parameters represent the HTTP request object (req), the HTTP response object (res) and the next middleware function to pass processing to. you should usually call the next function after completing processing so that the next middleware function can execute. 

## Creating your own middlware

As an example of writng your own middleware, you can create a function that logs out the URL of the request and then passes on processing to the next middleware function

```js
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});
```

remember that the order that you add middleware to the express app object controls the order that the middlware functions are called. Any middleware that does not call the next function after doing its processing, stops the middleware chain from continue. 

## Builtin middleware
In addition to creating your own middlware functions, you can use a built in middleware function. Here is an example of using the static middleware function. This middleware responsds with static files, found in a given directory that match the request URL. 

```js
app.use(express.static('public'));
```
Now if you create a subdirectory in your project directory and name it public you can serve up any static content that you would like. For example, you could create an index.html file that is the default content for your web service. Then when you call your web servie without any path ithe index.html file will be returned. 

## Third party middle ware. 
install third party middleware using npm install. 

npm install cookie-parser

```js
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.post('/cookie/:name/:value', (req, res, next) => {
    res.cookie(req.params.name, req.params.value);
    res.send({ cookie: `${req.params.name}:${req.params.value}` });
});
```

It is common for middleware functions to add fields and functions to the req and res objecst so that other middleware can access the functionality they provide. You see this happening when the cookie parser middleware adds the req.cookies object for reading cookies, and also adds the res.cookie function in order to make it easy to add a cookie to a response.

### Error handling.
To add error handling, simpling add an aditional err parameter

```js
function errorMiddlewareName(err, req, res, next)
``` 
if you wanted to add a simple error handler for anything that might go wrong while processing HTTP requrest you could add the following 

```js
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});
```

We can test that our error middleware is getting used by adding a new endpoint that generates an error.

```js
app.get('/error', (req, res, next) => {
    throw new Error('Trouble in river city');
});
```
Now if we use curl to call our error endpoint we cna see that the response comes from the error middleware.

### Debugging an express web service
Lets take a moment to tak about how you can debug a web service running with the express package under Node.js. Using the code that you created above, set a breakpoint on the code inside the getStore endpoint callback and another preakpoint on the app.listen call. Start debugging by pressing f5. The debugger should stop on the listen call where you can inspect the app variable. Press f5  again to continue running. Now open up your browser and set the location to localhost: 8080/store/provo. This should hit the breakpointon the endpoint. Take some time to time to inspect the req object. you should be able to see what the HTTP method is, what parameters are provided, and what the path currently is. Press F5 to continue. Your browser should display the JSON object that you returned from your endpoint.

Make another request from our browser, but this time include some query parameters. Something like http:://localhost:8080/store/orem?order=2 Requesting that url hsould cause your breakpoint to hit again where you can see the URL changes reflectted in the req object. 
Now, instead of pressing f5, press f11 to step into the res.sedn function. This will take you out of your code and into the express code that handles sending a response. becuase you installed the express backage using NPM, all of expresses source code is sitting in the node_modules directory. You can also set breakpoints there, examine variables and step into functions. Debugging into popular packages is a great way to learn how to code by seeing how really good programmers do things. Take some time to walk around Holowaychuks code and see if you understand what is going on. 