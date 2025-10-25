# Router
A web framework router provides essential functionality for single-page applications that would otherwise have been handled by rendering multiple html pages. 
 With a single page application, the browser only loads one HTML page and then JavaScript is used to manipulate the DOM and give it the appearance of multiple pages. 
- React does not have a standard router package, and there are many that you can choose from. 
- We will use the react-router-dom
- A basic implementation of the router consists of a BrowserRouter component that encapsulates the entire application and controls the routing action. The Link or NavLink components caputres user navigation events and modifies what is rendered by the Routes. 