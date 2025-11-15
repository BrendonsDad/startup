// Putting it all together
// Here is a full example of our web service built using Express

// Import the Express module
const express = require('express');
// Import the cookie-parser module
const cookieParser = require('cookie-parser');
// Create an Express application
const app = express();

//Third party middleware - Cookies
app.use(cookieParser());

// Define a route for GET requests to the root URL
app.post('/cookie/:name/:value', (req, res, next) => {
    // Set a cookie
    res.cookie(req.params.name, req.params.value);
    // Send a response
    res.send({ cookie: `${req.params.name}:${req.params.value}` });
});

// Define a route for GET requests to /cookie
app.get('/cookie', (req, res, next) => {
    // Send the cookies back in the response
    res.send({ cookie: req.cookies });
});

// Creating your own middleware - logging
app.use((req, res, next) => {
    // Log the request method and URL
    console.log(req.originalUrl);
    // Call the next middleware in the stack
    next();
});

// Built in middleware - Static file hosting 
app.use(express.static('public'));

// Routing middleware

// Get store endpoint
app.get('/store/:storeName', (req, res) => {
    // Send back the store name from the URL parameter
    res.send({ name: req.params.storeName});
});

// Update store endpoint
app.put('/st/:storeName', (req, res) => res.send({ update: req.params.storeName }));

// Delete store enpoint
app.delete(/\/store\/(.+)/, (req, res) => res.send({ delete: req.params[0] }));

// Error middleware
app.get('/error', (req, res, next) => {
    throw new Error('Trouble in rivit city');
});

app.use(function (err, req, res, next) {
    // Handle the error
    res.status(500).send({  type: err.name, message: err.message });
});

// Listening to a network port 
const port = 8080;
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});