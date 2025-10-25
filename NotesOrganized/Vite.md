# Vite
- In order use most web frameworks you need to include a full web framework toolchain that allows us to use JSX, minification, polyfills, and bundling for our applications.
- For our toolchain we are going to use Vite.
- Vite bundles your code quickly, has great debugging support, and allows you to easily support JSX, TypeScript, and different CSS flavors. 
- The main files in the application are index.html, main.jsx, and App.jsx. The browser loads index.html which provides the HTML element ($root) that the React application will be injected into. It also includes the script element to load main.jsx.
- main.jsx creates the React application by associating the #root element with the App component found in App.jsx. 

## JSX vs JS
- The Vite CLI using .jsx extension for JSX files instead of the JavaScript .js extension. 

## Deploying a production release
The deployment script for Simon React (deployReact.sh) creates a production distribution by callin npm run build and then copying the resulting dist directory to your production server. 