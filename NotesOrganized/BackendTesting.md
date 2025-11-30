# Backend Testing
Using test driven development (TDD) for testing service endpoints is a common industry practice. Testing services is usually easier than writing UI tests becuase it does not require a browser. However, it does still take effort to learn how to write tests that are effective and efficient. Making this a standard part of your development process will give you a significant advantage as you progress in your professional career. 

There are lots of good testing packages that work will with express. We will look at jest.

### Getting a service to test
To get started with Jest we need a simple web service. We can reuse the login app that we built when discussing the authentication service. This is a simple React application that provides register, login, logout, and a single getMe secure endpoint. 

### Reconfigure the service for test
In order to allow Jest to start up in http server when running tests, we initialize the application a little bit differently than we have in the past. normally we would have just started listening on the express app object after we defined our endpoints. Instead we export the express app object from our server.js file and then import the app object in the index.js file that is used to run our service. 

Breaking apart the definition of the service from the starting of the service allows us to start the service both when we run normally and when using our testing framework. 

You can verify that the service is working properly by running the service in the vscode debugger and pressing f5 while viewing the index.js file

### Creating the first test
Jest looks for tests in anyu file that has a suffix of .test.js lets go ahead and create a file named service.test.js and create a basic jest test function. Note that you dont need to include a require statement to import jest function into your code. Jest will automatically import itself when it discovers a test file.

```js
test('that equal values are equal', () => {
    expect(false).toBe(true);
});
```

The test function takes a description as the first parameter. The description is meant to be human readable. The second parameter is the function to call. Our function jsut calls the jest expect function and chains it to the toBe function. You can reas this as expect false to be true which is of course not ture, but we want to see our test fail the first time we run it. We will fix this later so that we can show what happens when a test succeeds. 

In order to run the test we need to install the jest package using npm. From the console install the package. The -D parameter tells npm to install jest as a development package. That keeps it from being included when we do production release builds. 

```bash
npm install jest -D
```

Now replae the scripts section of the package.json file with a new command that will run our tests with jest.

```json
"scripts": {
    "test": "jest"
},
```

We can fix our test by rewriting it so that the expected value mathces the provided value

```js
test('that equal values are equal', () => {
    expect(true).toBe(true);
});
```

This time when we run the test it passes

Note that this example didnt actually test any code but it didd demonstrate how easy it is to write tests. A real test function would call code in your program. Let do this by actually making calls to our endpoints. 

### Testing endpoints
To test our endpoints we need another npm package so that we can make http requests without having to actually send them over the network. This is done with the supertest npm package. install this now as a development dependency.

to make an http an http request, you pass the service app to the supertest request function and then chain on the http verb function that you want to call, along with the endpoint path. You can then chain on as many expect function as you woul like. 

```js
const request = require('supertest');
const app = require('./service');

test('register simple', async () => {
  const email = 'test@email.com';
  const password = 'toomanysecrets';
  const register = await request(app).post('/api/auth').send({ email, password });

  expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(register.body).toMatchObject({ email });
});
```

when we run this test we see that it passes without error

npm run test


### Basic testing methodology
In a very real way testing code is no different than app code. When you are writing tests, you are simply writing a program whos pupose is to test another program. For this reason, you should practice the same craftsmanship withg your resting code. It should be well designed, performant, and maintainable. Here are some characteristeics of good tests:
* Test only one thing
* Don't repeat tests that are already covered elsewhere
* Naturally supported by the application code
* Tests are readable
* Tests can run in any order
* Tests can run concurrently

### Creating testing utility functions
As your test become more complex you will want to create utility function so that you don't repeatedly assert the same thing or copy the code necessary to setup a test. Let's rewrite the register test so that we can reuse the registration function when we test other endpoints such as login or logout.

```js
function getRandomName(prefix) {
  return `${prefix}_${Math.random().toString(36).substring(2, 15)}`;
}

async function registerUser() {
  const email = getRandomName('email');
  const password = 'toomanysecrets';
  const response = await request(app).post('/api/auth').send({ email, password });

  return [response, email, password];
}

test('register', async () => {
  const [register, email] = await registerUser();

  expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(register.body).toMatchObject({ email });
});
```

This code is generalized so that we use different user email addresses for each test and simplifies the test down to just the lines necessary to clearly represent the register test. 

Now we can reuse the utility functions to write a test that tries to register the same user twice and also write a login test. 

Now we can reuse the utiltiy functions to write a test that tries to register the same user twice and also write a login test. 

```js
test('register existing', async () => {
  const [, email, password] = await registerUser();

  const response = await request(app).post('/api/auth').send({ email, password });
  expect(response.status).toBe(409);
});

test('login', async () => {
  const [, email, password] = await registerUser();

  const login = await request(app).put('/api/auth').send({ email, password });
  validateAuth(login);

  expect(login.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(login.body).toMatchObject({ email });
});
```



### Testing with cookies
Our register test is missing one critical validation. It doesnt assert that the endpoint returned a cookie that contains the authentication token. We can fix that by creating a validateAuth utility function and calling it from the test.

```js
function validateAuth(response) {
    expect(response).toBeDefined();
    expect(response.status)toBe(200);
    const cookie = response.headers['set-cookie'];
    expect(cookie).toBeDefined();
    const uuidRegex = /^token=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}.*$/i;
    const token = cookie.find((c) => c.match(uuidRegex));
    expect(token).toBeDefined();
}

test('register', async () => {
  const [register, email] = await registerUser();
  validateAuth(register);

  expect(register.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(register.body).toMatchObject({ email });
});
```

We can also test an endpoint authentication by first registering a user and then passing the cookie along with the call to the getMe endpoint

```js
test('get me', async () => {
  const [register, email] = await registerUser();

  const cookie = register.headers['set-cookie'];
  const getMe = await request(app).get('/api/user/me').set('Cookie', cookie);
  expect(getMe.status).toBe(200);
  expect(getMe.headers['content-type']).toMatch('application/json; charset=utf-8');
  expect(getMe.body).toMatchObject({ email });
});
```


### Coverage 
Determining how many lines of your app code are called by your testing code is called coverage. Generally you want enough coverage to give you confidence that your code does what you think it does without having to manually test everything each time you make a change to the code.

You enable coverage with jest by creating a file named jest.config.json with the following content:

```js
{
  "collectCoverage": true,
  "coverageThreshold": {
    "global": {
      "lines": 80
    }
  }
}
```

Now when you run the tests that we have created so far you will get a coverage report. The report tells which lines are not covered and the total coverage percentage. Because we specified that at least 80% of the lines must be covered you get an error that we only covered 68.18%

### VS Code Jest extension
You can use the VS Code Jest extension to visualize what tests are passing, automatically run tests whenever your code changes, run a test with the click of a button, see what lines of code are covered and get inline feedback about failing tests. 

### Test driven development
The great thing about test driven development (TDD) is that you can actually write your tests first and then write your code based upon the design represented by the tests. When your tests pass you know your code is complete. Additionally, when you make later modifications to your code you can simply run your tests again. If they pass then you can be confident that your code is still working without having to manually test everything yourself. With systems that have hundreds of endpoints and hundres of thousands of lines of code, TDD becomes an indispensible part of the development process. 