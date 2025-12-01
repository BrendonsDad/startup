# WebSocket chat
With the understanding of what the WebSocket protocol is, the basics of using it from Node  and the browser, and the ability to debug the communication, it is time to use WebSocket to build a simple chat application

In this example we will create a React frontend that uses websocket and displays chats between multiple users. The React code for the client will be organized similarly to Simon and your startup. A backend Express server will forward the websocket communication from the differnt clients. 

## Setting up the project
Before we begin writing code we need to set up the React application project. We can follow the basic React setupt that we discussed in the simple Hellow World React app that we created in previous instruction. This indludes
1. Creating an NPM project, installing Vite, React and the WebSocket package.

```bash
mkdir chatDemo && cd chatDemo
npm init -y
npm install vite@latest -D
npm install react react-dom
```
2. Configure NPM to run Vite

```json
"scripts": {
    "dev":"vite"
}
```
3. Configuring Vite to proxy WebSocket requests to the backend when debugging. 
4. Creating a basic index.html file that loads your React application
5. Creating your React application in index.jsx
6. Creating your backednd service in service/service.js and installing the express and ws packages

### Frontend React
In the root of the project create all of the files representing the frontend code. 

This consists of our main index.html, main.css, and a index.jsx file that contains all the React components. 