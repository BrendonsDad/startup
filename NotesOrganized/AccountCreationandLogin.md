# Account Creation and Login
You support secure authentication in a web app by first providing a way for users to uniquely indentify themselves. This usually requires three service endpoints. One to initially refgister, a second to login on future visits, and a third to logout. Once a user is authenticated we can control access to other authorized endpoints such as getting user data or making purchases. The following demonstrates how to make this all work correctly. 

## Endpoint design

First, define what each of our endpoints do by creating simple curl commands. We can also use these commands to test the ednponts when we are done. 

Endpoint                   Purpose
Registration               Create account (create user and auth)
Login                      Log into an account (create auth)
Logout                     LOGOUT OF ACCOUNT (delete auth)
Get Me                     Returns info about the authenticated user

### Registration endpoint
Given an email and password, return a cookie containing the authentication token. If the email already exists, return 409 conflict

```bash
POST /api/auth HTTP/2
Content-Type: application/json
{
    "email":"marta@id.com",
    "password":"toomanysecrets"
}

HTTP/2 200 OK
Content-Type: application/json
Set-Cookie: auth=tokenHere
{
    "email":"marta@id.com"
}
```

### Login authentication enpoint
Given an email and password, return a cookie containing the authentication token. IF the email does not exist or the password is bad, return 401 (unathorized).

```bash
POST /api/auth HTTP/2
Content-Type: application/json
{
    "email":"marta@id.com",
    "password":"toomanysecrets"
}

HTTP/2 200 OK
Content-Type: application/json
set-Cookie: auth=tokenHere
{
    "email":"marta@id.com"
}
```

# Logout authentication endpoint

Given a cookie containing an authentication token, mark the token as invalid for future use. Always return 200 (ok)

```bash
DELETE /api/auth HTTP/2
Cookie: auth=tokenHere

HTTP/2 200 OK
Content-Type: application/json
{
}
```

### GetMe endpoint
Given a cookie containing an authentication token, return the authenticated user. If the token is invalid or the user does not exist, return a 401

```bash
GET api/user HTTP/2
Cookie: auth=tokenHere

HTTP/2 200 OK
Content-Type: application/json
{
    "email":"marta@id.com"
}
```


### Web Serice
With our service endpoints defined, we can start building our web service by stubbing out each of the endpoints 

service.js

```js
const express = require('express');
const app = express();

// registration
app.post('/api/auth', async (req, res) => {
    res.send({ email: 'marta@id.com'});
});

// login
app.put('/api/auth', async (req, res) => {
    res.send({ email: 'marta@id.com'});
});

// logout
app.delete('/api/auth', async (req, res) => {
    res.send({});
});

// getMe
app.get('/api/user', async (req, res) => {
    res.send({ email: 'marta@id.com'})
});

app.listen(3000);

```

Using the above code, we build the authorization application with the following steps
1. Create a directory called authTest for the project. 


### Handling requests
With our service stubbed out, we now begin to fill in the registration endpoint. The first step is to read the credentials from the body of the HTTP request. Since the body is designed to contain json we need to tell edpress to automatically parse any http request that have a content type of application/json into a javascript object. we do this with by installing the express.json middleware and reading the json object form the req.body.

For now, we simply demonstrate that the json parsing is working by echoing the request body back in the response. 


```js
app.use(express.json());

app.post('/api/auth', (req, res) => {
    res.send(req.body);
});
```

Test that it is working with a curl command

#### Storing users and hashing passwords
Now that we have proven that we can parse a request body correctly, we want to create a function that will actually create the user and store it in memory. We also want to properly manage passwords by storing a cryptographically hashed version of the original password. Hashing a password protects our user incase our database gets compromised.

To hash our passwords, we use the bcryptjs package. This creates a very secure one-way hash of the password. Here is the code:

```js
const bcrypt = require('bcrypts');

const users = [];

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash
    };

    user.push(user);

    return user;
}

function getUser(field, value) {
    if (value) {
        return users.find((user) => user[field] === value);
    }
    return null;
}
```


#### simple registration endpoint

We now implement the registration enpoint by first checking to see if we already have a user with that email addreess. If the user already exists, then we immediately return a 409 (conflict) status code. Otherwise we create a new user and only retunr the user's email.

```js
app.post('/api/auth', async (req, res) => {
    if (await getUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Exiting user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);
        res.send({})
    }
});

```

#### Secure registragion endpoint
To complete the registration endpoint, we need to generate an authorization token and store it on the browser using an http cookie. 

#### Generating authentication tokens

To generate a random authentication token, we use the uuid NPM package. UUID stands for universally unique identifier, and it does a really good job creating hard to guess, random, unique ID

```js
const uuid = require('uuid');

token: uuid.v4();
```

#### Generating cookies
When a user successfully registers, or logs in, we generate and store the authentication token and send a cookie containing the token as part of the http response. 

To generate an http cookie we use the cookie parser npm package. Cookie parser does not all the work of sending a cookie to the browser and parsing it when the browser makes subsequent requests. 

We want to make it as secure as possible, and se we use the cookie httpOnly , secure, and sameSite options

* httpOnly tells the browser to not allow javascript running on the browser to read the cookie
* secure requires https to be used when sending the cookie back to the server.
* sameSite will only return the cookie to the domain that generated it.

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Create a token for the user and sed the cookie containing the token
function setAuthCookie(res, user) {
    user.token = uuid.v4());

    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

```

#### Complete registration code

The following shows all of the code necessary to generate a token and then stores ito n the browser in an http cookie. This is done by calling the setAuthCookie function from the registration and login endpoints.

```js 
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

app.use(cookieParser());

function setAuthCookies(res, user) {
    user.token = uuid.v4();

    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });

    // Registration endpoint
    app.post('/api/auth', async (req, res) => {
        if (await getUser('email', req.body.email)) {
            res.status(409).send({ msg: 'Existing user' });
        } else {
            const user = await createUser(req.body.email, req.body.password);

            setAuthCookie(res, user);

            res.send({ email: user.email });
        }
    });
}
```


#### Login endpoint

The login endpoint needs to get the hashed password that was stored for the user, compare it to the provided password using bcrypt.compare, and if successful set the authentication token in the cookie. If the password does not match, or there is no user with the given eamil, the endpoint returns status 401 (unathorized)


#### GetMe endpoint
With everytghing in place to register and login using the credentials, we can now implement the secure getMe endpoint. To implement this we get the user object from the database by querying on the authentication token. 

#### Experiement 
With everything implemented, we can use curl to try it out. First start up the web service from VS Code by pressing F5 and selecting node.js as the debugger if you have not already done that. You can set breakpoints on all the different endpoints to see what they do and inspect the different variable. Then open a console window and run the following curl commands. 

#### Login Frontend code
With the backend service in place, we can create a simple react application that deomonstrates the use of the authentication endpoints. 

1. Creating an NPM project, installing Vite, and installing React

```bash

npm init -y
npm install vite@latest -D
npm install react react-dom react-router-dom

```

2. Configiure Vite to proxy API request throught the backend when debugging
3. Creating a basic index.html file that loads your React application
4. Creating your React application in index.jsx

#### The authentication components
In the index.jsx file we will set up some simple routing between a login component and a user profile component.
