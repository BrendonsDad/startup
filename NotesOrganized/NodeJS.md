# Node.js

Node.js was the first successful application for deploying JavaScript outside of a browser. This changed the JavaScript mindset form a browser technology to one that could run on the server as well. This means JavaScript can power your entire technology stack. One language to rule them all. 

## Installing Node.js
Your production environment web server comes with Node.js already installed. However, you will need to install Node.js in your development environment if you have not already. The easiest way is to use the official download at nodejs.org.

## Checking that Node is installed
The node.js console application is simply called node. You can verfiy that Node is working correctly by running node with the -v parameter. 

## Running programs
You can execute a line of JavaScript with Node.js from your console with the -e parameter

```bash
➜  node -e "console.log(1+1)"
2
```
You can also run node in interpretive mode by executing without any parameters and then typing your JavaScript code directly into the interpreter


```sh
➜ node
Welcome to Node.js v16.15.1.
> 1+1
2
> console.log('hello')
hello
```

however, to do real work you need to execute an entire project composed of dozens or hundreds of JavaScript files. You do this by creating a single starting JavaScript file, named something like index.js. you can execute by running node with index.js as a parameter


## Node package manager
While you could write all of the JavaScript for everything you need, it is always helpful to use preexisting packages of JavaScript for implementing common tasks. To load a package using Node.js you must take two steps, first install the package locally on your machine using the Node Package Manager and then include a require statement in your code that references the package by name. NPM is automatically installed when you install Node.js.

You can search pacages on the NPM website

- Before you start using NPM to install packages you need to initialize your code to use NPM. This is done by creating a directory that will contain your JavaScript and then running npm init. 

## Package.json
if you list the files in the directory you will notice that it has created a file named package.json. This file contains 1) metadata about your project such as its name and default entry JavaScript file, 2) commands (scripts) that you can execute to do things like run, test, or distribute.

With NPM initialized to work with your project, you can now use it to install a node package. As a simple example, install a package that knows how to tell jokes. This package is called give-me-a-joke

When you clone your source code from Github to a new location, the first thing you should do is run npm install in the project directory. This will cause NPM to download all of the previously installed packages and recreate the node_modules. directory.

It may seem like a lot of work but after you do it a few times it begins to feel natural. Just remember the main steps
1. Create your project directory
2. Initialize it for use with NPM by runing npm init -y
3. Make sure .gitignore file contains node_modules
4. Install any desired packages with npm install <package name here>
5. Add require('<package name here>') to your application's JavaScript
6. Use the code the package provides in your JavaScript
7. Run your code with node index.js