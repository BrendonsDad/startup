# Notes
This is where I will put all of my notes for this class.

## My First Notes for the Class
- This was a nice training. I didn't learn anything new, but I did get a good refresher on github and git. I will surely put more notes here in the future.

## Getting Started / Start Up Design
- Your startup demonstrates your mastery of the instruction presented by this course. 
- Needs to Demonstrate the use of HTML, CSS, and JavaScript, calling web services, provideing web services, authentication, storing data persistently, and using web sockets for sending realtime data to and from your server. 

Step one: Create an Elevator pitch.

## Elevator Pitch
- Something to excite buisness people or your friends that sums up your start up
- Should be no more than a paragraph.
- Then, after this pitch, sketch out what the applictaion should look like. 

## Representing all technologies

* HTML: This is pretty standard and will provide the basic structure and text of my application. My application is meant to connect friends, so HTML will be vital to creating a clear UI and making sure that the App has all the nessisary information. Currently, I am planning on using 4 HTML pages. A login page, a profile page, a connect page (where people can find new friends with similar music taste) and a messaging page. 
* CSS: Obviously, I want my startup to look nice, and that is where CSS will come into play. I will use CSS to make sure that my sections, background, and text are all pleasing to my users. Good CSS implementation will be vital to a positive user experience.
* React: React will as the name suggest, help my application react to the users actions. Obviously since I am not making a personal blog, or informational site, but rather an application, I will be using a fair share of React. I will use react to create a nice login/registration form, submitting pictures, playing songs, and sending messages and invites to other users. 
* Services:
    * Connect page
    * Add friend
    * Join Music Group
    * Message friend
* Authentication: This part of my program will be handeled by my login/registration form, which will be stored in my database.
* Database Data: I will use this to store information on my users, such as their name, birthday, username, password, and images.
* WebSocket Data: This will be vital to having messages sent to and from users. I don't think I will have a home/browsing page, but if I did, I might need to use websockets for those things.

## First Assignment
What does my README.md page have to look like?
- include start up specification
- elevator pitch
- key features
- and a description of how you will use each technology and design images

### How this will be graded:
* 10% - Proper use of Markdown in README.md
* 20% - A concise and compelling elevator pitch in your README.md
* 10% - A Description of key features in your README.md
* 30% - Description of how you will use each technology
    * HTML - Basic structural and organizational elements
    * CSS - Styling and animating
    * React - Componentization, routing, and fuctional interactivity.
    * Web service - Endpoints provided by your backend service.
    * Third party service - Endpoint procided by some other service
    * Authentication: Register, login, and logout
    * Database data: Store authentication ad application data.
    * WebSockket data: Realtime inforation pushed from your backend to your frontend.
*30% - One or more rough sketches of your application. Images must be embedded in your README.md.


## Hyptertext Markup Laguage
* Originally designed to be a publishing format for web documents, or pages. 
* HTML is very powerful, but we need CSS and JavaScript to create our full web app. 
### Common Elements
* html: the page container
* head: Header information
* title: Title of the page
* meta: Metadata for the page such as character set or viewport setting
* script: JavaScript reference. Either a external reference, or inline
* include: External content reference
* body: The ntire content body of the page
* header: Header of the main content
* footer: Footer of the main content
* nav: Navagational inputs
* main: Main content of the page
* section: A section of the main content
* aside: Aside content from the main content
* div: A block division of content
* span: An inline span of content
* h<1-9>: Text heading. Fro h1, the highest level, down to h9, the lowest level
* p: A paragraph of text
* b: Bring attention
* table: Table
* tr: Table row
* th: Table header
* td: Table data
* ol, ul: Ordered or unordered list
* li: List item
* a: Anchor the text to a hyperlink
* img: Graphical image reference
* dialog: Interactive component such as a confirmation
* form: A collection of user input
* input: User input field
* audio: Audio contet
* video: Video content
* svg: Scalable vector graphic content
* iframe: Inline frame of another HTML page

## HTML structure elements
* common structural elements of HTML include body, header, footer, ain, section, aside, p, table, ol/ul, div, and span.
* Top level: body. The body has three children, a header, main, and footer
* The header contains a paragraph with a span, and a navigation containing multiple divisions and sub-content
* The ain contains ultiple section s that contain either an unordered list (ul) or a table. ain also contais an aside for cotent that does ot fit the content flow of the sections
* The footer has a content division with a single span

## Simon HTML
* Dont worry about how visually pleasing your app is right now. Only worry about the structure. 
* Make sure to not clone a repo inside another repo. This will be bad and will mess up my code. Learn about submodules.

## HTML input eleents
* HTML has ways to accept user input, such as form, fieldset, input, select, optgroup, option, textarea, label, output, and meter.
* Before JavaScript was introduced the form container element was the only way for a browser to send the input data to a web server. 
* With Java script we have uch more control. But we still use it and it has its uses. 
* The input element represents many different input types. You set the type of of input with the type attribute. There are several diffeent types fto choose from including text, password, email, tel, url, numer and much more. 

## HTML Media Elements:
The HTML elements that represent media include img, audio, video, svg, and canvas. The img, audio, ad video elements are all simple references to an exteral file, but svg ad canvas both contain the code to render a visual image that can be animated. 
### External Media
* Media tag that reference external media all take a URL as an attribute. ex: https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg
* A relatie path references a fiel that is served ro the sae location as the HTL page rendering the element. ex: images/photo.jpg

### Image
* To include an image i your content you use the img eleent and specify the src attribute with the URL to the source image. In order to support accessibility, you should also include an alt attribute that describes the image. A full img eleent would look somethig like this:      
<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />

### Audio
<audio controls src="testAudio.mp3"></audio>

### Video
<video controls width="300" crossorigin="anonymous">
  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
</video>

### Internal Media
#### svg
svg is an etreely powerful and widely supoorted way to render graphics in your html. An example of an svg graphic that draws a black border and red circle looks loke this.
When combined with javascript and CSS you can produce some amazing visualizations
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" style="border: 1px solid #000000">
  <circle cx="150" cy="100" r="50" />
</svg>

#### Canvas
The canvas element was introduced to HTML in order to facilitate 2D drawing and animation. The HTML for the canvas element is fairly simple but actually drawing on the canvas requires Javascript support. Here is a simple example:
<canvas id="canvasDemo" width="300" height="200" style="border: 1px solid #000000"></canvas>
<script>
  const ctx = document.getElementById('canvasDemo').getContext('2d');
  ctx.beginPath();
  ctx.arc(150, 100, 50, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';
  ctx.fill();
  ctx.stroke();
</script>

## Week Three Assignment
* Structure the startup application. This includes all of the pages, headers, footers, images, and content necessary to represent what your application will do. 
* There should be a placeholder for everything that your application will do.
* You will wat an HTML file for each of the mai coponets of your application. The default coponent of you rapplication must be represented in a file named index.html. 
* You will want a similar layout to to simon
Make sure you have a placeholder for all the technologies that you will eventually eed to represent your application. This includes:
* Application data: A rendering of application data that you will eventually populate. For Simon, this is the siple SVG graphic buttons, the username, and a radom inspirational quote.
* Authentication: An input for your user to create an account and login. You will want to display the user's name after they login.
* Database data: A renderig of application data that is stored in the database. For sion this is the high scores of all the players.
* WebSocket data: A rendering of data that is received from your server. This may be realtime data sent from other users. Or realtime data that your service is geerating. For simon this updates everytime a user creates or ends a game. 
* You must use the same startup Github repository that you created for the specification deliverable. Update the otes.md file with things that you learn as you work on your startup.
* Once you have developed your application to where you want it, you need to release it to your production environment. Copy the deployFiles.sh script from the Sion HTML repo to your startup repo and use startup for the service paraeter (-s)
for example:
./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s startup

## Deliverable
1. Review and deploy Simon HTML
    * Clone the HTML Simon repository to your developent environment. 
    * Open the project in VS Code ad exaine the application's use of HTML.
    * Execute in your develpent environment using the VS Code live server extension.
2. Create the HTML deliverable fo your startup applicatio. Make sure your name is displayed in the application and that there is a link to your GitHub repository. 
3. Represent all of the content ad structure that your final application will need.
4. Include placeholders for all the tecology that your application will eventually represent. 
5. Make sure your main HTML file is named index.html so that it will load by default.
6. Periodically commit and push your code to GitHub.
7. Periodically Update your startup repository's notes.md file to reflect what you have learned and what you want to remember.
8. Push your final verison of your project to GitHub.
9. Deploy your startup application to your production environment (your server)
10. Make sure your application is available from your production environment. 
11. Upload your URL to your startup application to the Canvas assignment.

Grading Rubric:
* Simon HTML deployed to your production enviornment
* A link to your GitHub startup repository prominetly displayed on your applications home page
* Notes in your startup Git repository README.md File docuenting what you modified ad added with this deliverable.
Enough git coits
* Properly structured HTML
    * 20% HTML pages for each component of your application
    * 10% Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER
    * 10% Links between pages as necessary
    * 10% Application textual content
    * 10% Placeolder for 3rd party service calls
    * 10% Application images
    * 10% Login placeholder, including username display
    * 10% Database data placeholder showing content stored in the database
    * 10% Websocket data placehholder showing where realtie communication will go.

# Cascading Style Sheets
* Helps developer create complex renderings of dynamic content that is responsive to the actions of the user and the device the application is rendered on. 
* Functionally, CSS is primarily concerned with defining rulesets or simply rules. 
* A rule is comprised of a selector that selects the elements to apply te rule too. 

## Associating CSS with HTML

There are 3 ways you can associate CSS with HTML. The first way is to use the style attribute of an HTML element ad explicity assignn one or more declarations. The best way is to use the HTML linki element to create a hyper link reference to a external file containig CSS rules. The link element must appear in the head element of the document.

```html
<link rel="stylesheet" href="styles.css" />
```

**styles.css**

```css
p {
  color: green;
}
```

The link element is usually the prefered way to define CSS.

## Cascading styles
We might set color property for all body elements to be red, and then paragraph elements to be green, and then span elements to be blue, and finally use a style element on a specific span to be black.

```html
<body>
  <p><span style="color:black">CSS</span></p>
</body>
```

```css
body {
  color: red;
}
p {
  color: green;
}
span {
  color: blue;
}
```
* In this case the rules cascade down from the highest nodes in the DOM tree to the lowest level. Any declaration property defined at lower level will override the higher declaration. You can see this happening if you use the browser's debugger.

## The box model
CSS defines everything as boxes. When you apply styles, you are applying them to a region of the display that is a rectangular box. Withi an elements box there are several internal boxes. The innermost box holds the elements content. 
the box goes in this order, starting from the outside:

margin->border->padding->content

# CSS Selectors
* The first step in understanding CSS is mastering how to select the elements that a CSS rule applies to. 
* Starting off, we can make all elemetns in the document use a sans-serif font. 

```css
body {
  font-family: sans-serif;
}
```

We can also use element name selectors to give a bottom border to the top level heading (h1) as well as modify the section elements to pop out with a gray background and some white space in the padding and margins.

```css
h1 {
  border-bottom: thin black solid;
}
section {
  background: #eeeeee;
  padding: 0.25em;
  margin-bottom: 0.5em;
}
```
## Combinators
Next we want to change the color of the second level headings (h2), but we only want to do that within the sections for each department. We can provide a descendant combinator that is defined with a space delimited list of values where each item in the list is a descendant of the previous item. So our selector would be all h2 elements that are descendants of section elements. 

```css
section h2 {
  color: #004400;
}
```

There are other types of combinators that you can use. These include the following.

* Descendant -- a list of descendants -- example: body section
* Child -- A list of direct children -- example: section > p
* General sibling -- A list of siblings -- example: div ~ p
* Adjacent sibling -- A list of adjacent sibling -- example: div + p

## Class selector

example:

```css
.summary {
  font-weight: bold;
}
```

you can also combine the eleent name and the class selectors to select all paragraphs with the class of summary:

```css
p.summary {
  font-weight: bold;
}
```

## ID selector
ID selectors reference the ID of an eletn. All IDs should be unique within an HTML document so this select targets a specific element. 

```css
#physics {
  border-left: solid 1em purple;
}
```

## Pseudo Selector
CSS also defines a significatnt list of qsuedo selectors which select based on positional relationships, mouse interactions, hyperlink visitation states, and attributes. We will give just one exaple. Suppose we want our purple highlight bar to appear only when the mouse hovers over the text. To accomplish this we can change our ID selector to select whener a section is hovered over.

```css
section:hover {
  border-left: solid 1em purple;
}
```

# CSS Declarations
CSS rule declarations specify a property and value to assign when the rule selector matches one or more elements. There are legions of possible properties defined for modifying the style of an HTML document. For our purposes we will discuss just a few of the more commonly used ones so that you can get a feel for wide variety of functionality they represet.

**references the table on github for the class.**

## CSS Fonts
The CSS font-family property defines whta fonts should be used. 

There are four major font familys: Serif, sans-serif, fixed, and symbol. 

### Importing fonts
In addition to referencing standard fonts found on the user's computer you can specify a font that you provide with your application. That way your application is guaranteed to always look the same. In order to have the browser load a font you use the @font-face rule ad provide the font name and source location

```css
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.ttf');
}

p {
  font-family: Quicksand;
}
```

if you dont want to host font files on your server, then you can load them from a font provider. For example, Google provides a large selection of open source fonts that you can use without paying any royalties. The easiest way to use Google fonts is to use a CSS import statement to referece the Google Font Service. This will automatically generate the CSS for importing the font.

```css
@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```

# CSS Animation
Using CSS to animate your componetns is an easy way to make your application feel alive and interactive. You create CSS animations using the animation properites and defining keyframes for what the element should look like at different ties in the animation. Lets walk through an example:

We have a paragraph of centered text and we want it to zoom in until its size is 20% of the view height

```css
p {
  text-align: center;
  font-size: 20vh;
}
```

To make thishappen we specify that we are animating the selected elements by adding the animation-name property with a value of demo. This name refers to the name of the keyframes that we will specify in a minute. The keyframes tell what CSS properties should be applied at different key points in the animation sequence. We also add an animation-duration property in order to specify that the animation should last for three seconds.

```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
```

Now we are ready to create the keyframes. We dont have to define what happens at every millisecond of the animation. Instead we only need to define the key points, and CSS will generate a smooth transition to move from one keyframe to another. Inour case we simply want to start with text that is invisible and have it zoom into the full final size. We can do this with two frames that are designated with the keywords from and to.

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }
  to {
    font-size: 20vh;
  }
}
```

Thats everything we need to do. However, let's make one more addition. It would look better if towards the end, the paragraph bounced out a little bigger than it's final size. We can accomidate that by adding another key frame that happens 95% through the animation. 

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20h;
  }
}
```

# Responsive design
Modern web applications are expected to run well on a large variety of computing devices.

## Display
The CSS display property allows you to change how an HTML element is displayed by the browser. The common options for the display property include the following. 

* none: Dont display this element. The element still exists, but the browser will not render it. 
* block: Display this element with a width that fills its parents element. A p or div element has block display by default.
* inline: Display this element with a width that is only as big as its content. A b or span eleent has inlie display by default.
* flex: Display this element's children in a flexible orientation.
* grid: Display this elemets children in a grid orientation.

## Viewport meta tag
When smart mobile devices started gaining popularity, they began to be used to view websites. However, the websites were optimized for desktop displays and ot little tiny mobile screens. To solve this mobile browsers autmatically started scaling the website so that it looked better on a small screen. Unfortunatly, as web applications started being responsve to screen size, the bile browser's scaling got in the way. The solution is to include the meta tag in the head elemtn of all your HTML pages. This tells the browser to not scale the page. 

```css
<meta name="viewport" content="width=device-width,initial-scale=1"/>
```

## Float
The float css property moves an element to the left or right of its container element and allows inline elements to wrap around it. For example, if we had an aside element followed by a lare paragraph of text, we could create the following CSS rule in order to cause the text to wrap around the aside.

## Media queries
One of the main CSS features for creating responsive applications is the @media selector. This selector dynamically detects the size ad orientation of the device and applies CSS rules to represent the structure of the HTML in a way that accommodates the change.

We can use the @media selector to tell us which side of the screen (technically the viewport) is the longest.

In this example we simply want to know if the screen is oriented in portrait mode (short side on top) or not. 
```css

@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}

```
You can also use media queries to make entire pieces of you rapplication disappear

```css
@media (orientation: portrait) {
  aside {
    display: none;
  }
}
```

## CSS Grid

The grid display layout is useful when you want to display a group of child elements in a responive grid. We start with a container element that has a bunch of child elements.

```HTML
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```

We turn this into a responsive grid by including a CSS display property with the value of grid on the container element.

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

## CSS Flexbox
The flex display layout is useful when you want to partition your application into aread that responsively move around as the window resizes or the orientation changes. In order to demonstrate the power of flex we will build an application that has a header, footer, and a main content area that is split into two sections, with controls on the left and content on the right.

### Example

We build the structure with our html

```html
<body>
  <header>
    <h1>CSS flex &amp; media query</h1>
  </header>
  <main>
    <section>
      <h2>Controls</h2>
    </section>
    <section>
      <h2>Content</h2>
    </section>
  </main>
  <footer>
    <h2>Footer</h2>
  </footer>
</body>
```

Now we can use flexbox to make it call come alive. We want our top level flexbox children to be column oriented and so we add the flex-direction property with a value of column. we then add some simple other declarations to zero out the margin and fill the entire viewport with our application frame.

```css
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}

To get the division of space for the flexbox children correct we add the following flex properties to each of the children:

```css
header {
  flex: 0 80px; /*0 meansit will not grow and 80px means it has a starting basis height of 80pixles*/
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1; /*flex:1 one means it will get one fractional unit of growth and sicne it is the only child with a non-zero growth value it will get all the remaining space. */
  display: flex;
  flex-direction: row;
}
```

Now we just need to add CSS to the control and content areas represented by the two child section elements. We want the controls to have 25% of the space and the content to have the remaining. So we set the flex property value to 1 and 3 respectively. That means that the controls get one unit of space and the content gets three units of space. No matter how we resize things this ratio will responsively remain. 

```css
section:nth-child(1) {
  flex: 1;
  background-color: hsl(180, 10%, 80%);
}

section:nth-child(2) {
  flex: 3;
  background-color: white;
}
```

### Media Query 
That completes our original design, but we also want to handle small screen sizes. To do this, we add some media queries that drop the header and the footer if the viewport gets to short and orient the main sections as rows if it gets too narrow. 

To support the narrow screen (portrait mode), we include a media query that detects when we are in portrait orientation and sets the flex-direction of the main element to be column instead of row. This cuases the children to be stacked on top of each other instead of side by side.

to handle making our header and footer disapper wehn the screen is to short to display them, we use a media query that triggers when our viewport heigth has a maximum value of 700 pixels. When that is true we change the display property for both the header and the footer to be none so that they will be hidden when that happens the main element becomes the only child and since it has a flex value of 1, it takes over everything.

```css
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```

# Debugging CSS
You can use the google chrome debugger to acces developer tools by right clicking on the HTML page element that you want to debug and seleccint the inspect option. 

# CSS Frameworks
CSS frameworks provide funcitons and components that commonly appear in web applications as web developer built more an dmore web applications they began to use the sam patterns over and over. They combined these patterns into a shared package of code and contributed it to the world as open surce repositories. This helped not only decrease the time to develope an application, but created a common user experience for the web in general. 

## Tailwind
A new rising contender in the CSS framework space is tailwind CSS and its associated component library Tailwind UI.    

## Simon CSS 
* All reference main.css, and their own specific css. 
* Flex is used to delimit the header, main, and footer elements. This makes them responsive to different screen sizes.
*The use of absolute positioning relative to the parent element for the game controls.
* The selection based on class attributes to style elements.
* The override of Bootstrap in order keep the menue from changing the flex direction to column on small screens. 
The use of @media selectors to hide content when the screen is too small.

# CSS Deliverable
* Application should basically appear as you would expect. This includes styling of placeholder data that you expect to get from the user logging in, application data, and webSocket data.
* You must use the same startup GitHub repository that you created for the previous deliverable.
* Update the notes.md file with thing you learned


# Startup React Phase 1: Routing
* Officially known as ECMAScript, JaaScript is a weakly typed language based upon concept found in C, Java, and Scheme. By far the mosed used programming language in the world. 
* Used to create serverless functions. 
* Javascript is executed using an interpreter at runtime instead of compiling it into a machine specific binar at build time. 

## Getting started

Let's start with a basic example. The follwoing Java
Script will concatenate three string together and then throw awahy the result. Not very useful, but JavaScript doesnt complain much. 

```js
'Hello' + ' ' + 'world';
```

Onle slightly more omplex is to call a function with the result of our concatenated string. In this case we call the JavaScript runtime's built in function console.log to output the string to the debugger console. 

```js
console.log('Hello' + ' ' 'world');
// OUTPUT: Hello world
```

You can also write your own functions.

```js
function join(a, b) {
  return a + ' ' + b;
}

console.log(join('Hello', 'world'));
// OUTPUT: Hello world
```

You can comment your JavaScript with either line or block comments

```js
// line comment

/*
block comment
*/
```

### Code delimiters
While it is not technically requred in most casees, it is conisdered good form to end JavaScript statements with a semicolon (;). Code blocks, and their resulting scope, are defined with curly braces ({ })

### Playgrounds
Before we go any further we need a way for you to write and run JavaScript yourself. there are two easy ways to do this. 
1. Use an online sanbox like codepen
2. Use your browsers debugger. For example, if you open Chrome and press f12 the debugger will display. Select the Console menue option. this will display a JavaScript interpreter where you can write and execute your code. 


# Node.js

In 2009 Ryan Dahl created Node.js. it was teh first successful application for deploying JavaScript outside of a browser. This changed teh JavaScript mindset from a browser technology to one that could run on the server as well. this means that JavaScript can power your entire technology stack. One language to rule them all. Node.js is often just referred to as Node. and is currently maintained by the Open.js Foundation.

"You can never understand everything. But, you should push yourself to understand the system" - Ryan Dahl.

Browsers run JavaScript using a JavaScript interpreter and execution engine. For example Chromium based browsers all use use the V8 engine created by Google. Node.js simply took the V8 engine and ran it inside of a console application. When you run a JavaScript program in Chrome or Node.js, it is V8 that rerads your code and executes it. With either program wrapping V8, the result is the same. 

## Checking that Node is installed
The node.js console application is simply called node. You can verify that Node is working correctly by running node with the -v parameter. Note that your version might be different than what is shown here. As long as it is an LTS version you should be fine. 

-> node -v

## Running Programs
You can execute a line of JavaScript with Node.js from your console with the -e parameter


```sh
-> node -e "console.log(1+1)
```

You can also run node in interpretive mode by executing it without any parameters and then typing your JavaScript code directly into the interpreter.

```sh
-> node
Welcome to Node.js v16.15.1
>1+1
2
>console.log('hello')
hello
```

However, to do real work you need to execute an entire project composed of dozens or even hundreds of JavaScript files. You do this by creating a single starting JavaScript file, named something like index.js, that refereces the code found in the rest of your project. You then execute your coe by running node with index.js as a parameter. For exapmle with the following JavaScript saved to a file named index.js

```jsx
function countdown() {
  let i = 0;
  while (i++ < 5>) {
    console.log(`Counting ... ${i}`);
  }
}

countdown();
```

We can execute the JavaScript by passing the file to node, and receive the following result.

-> node index.js
Counting ... 1
Counting ... 2
Counting ... 3
Counting ... 4
Counting ... 5

## Node Package manager
While you could write all of the JavaScript for everyting you need, it is always helpful to use preexisting packages of JavaScript for implementing common tasks. To load a package using Node.js you must take two steps. First install the package locally on you rmachine using the Node Package Manager (NPM), and then include a require statement in your code that refereences the package name. NPM is automatically installed when you install Node.js.

NPM knows how to access a massive repository of preexisting packages. You can search for packages on the NPM website. However, before you start using NPM to install packages you need to initialize your code using NPM. This is done by creating a directory that will contain your JavaScript and then running npm init. NPM will step you through a series of questions about the project you are creating youcan press the return key for each of the questions if you want to accpt the defaults. 

### Note
When you start installing package dependencies, NPM will create an additional file named package-lock.json and a directory named node_modules in your project directory. The node_modules directory contains the actual JavaScript files for the package and all of its dependent packages. As you install several packages this directory will start to get very large. You do not want to check this directory into your source control system since it can be very large and be built using the informationcontained in the package.json and package-lcok.json files. So make sure you include node_modules

When you clone your source code form Github to a new location, the first thing you should do is run npm install in the project directory. This will cause NPM to download all of the previously installed packages and recreate the node_modules directory.

The package-lock.json file tracks the version of the package that you installed that way if you rebuild your node_modules directory you will have the version of the package you intitially installed and not the latest available version. 

With NPM and the joke package installed you can now use the joke package in a JavaScript file by refrencing the package name as a parameter to the require function. This is then followed by a call to the joke object's getRandomDadJoke function to actually generate a joke create a file named index.js and paste the following into it. 

index.js
```jsx
const giveMeAJoke = require('give-me-a-joke');
giveMeAJoke.getRandomDadJoke((joke) => {
  console.log(joke);
});
```


This may seem like a log of work but after you do it a few times it will begin to feel natural. Just remember the main steps.

1. Create your project directory
2. Initialize it for use with NPM by running npm init -y
3. Make sure .gitignore file contains node_modules
4. Install any desired packages with npm install <package name here>
5. Add require('package name here') to your application's JavaScript
6. USe the code the package provides in your JavaScript
7. Run your code with node index.js

## Package.json

If you list the files in the directory you will notice that it has created a file named package.json. This file contains three main things: 1. Metadata about your project such its name and the default entry JavaScript file, 2) commands (scripts) that you can execute to do things like run, test, or distribute your code and 3. Packages that this project depends upon. The following shows tha tyour package.json looks like currently. It has some default metadata and a simple placeholder script that just runss the echo command when you execute npm run test from the console. 


# Debugging Node.js

Now that you are writing JavaScript that runs using Node.js, you need a way to launch and debug your code that runs outside of the browser. One great way to do that is to use the debugging tools built into VS Code. To debug JavaScript in VS Code you first need some JavaScript to debug. Open up VS Code and create a new file named main.js and paste the following code into the file. 

### Node --watch

Once you start writing complex web applications you will find yourself making changes in the middle of debugging session and you would like to have node restart automatically and update the browser as teh changes are saved. This seems like a simple thing, but over the course of hundreds of changes, every second you save really starts to add up. 

To Accomplish this you can start Node with the watch option. This causes Node to watch all your source code files and automatically reload itself if anything changes. 

You can experieent with this by starting node with the --watch parameter

```sh
node --watch main.js
```

With VS Code you can create a launch configuration that specifies the watch parameter when every time you debug with VS Code. In VS Code press CTRL-SHFT-P and type the command Debug: Add configuration. . Select the Node.js option. This will create a launch configuration named .vscode/launch.json. Modify the configuration so that it includes the --watch parameter. This should look something like the following. 




# Adding JavaScript to HTML

You can insert JavaScript into HTML with one of three ways:

1. Script block: Directly including it in the HTML within the content of a <script> element
2. External code: Using the src attribute of the script element to reference an external JavaScript file.
3. Inline event attribute: Putting JavaScript directly inline as part of an event attribute hanlder

index.js

```jsx
function sayHello() {
  alert("Hello");
}
```

index.html

```html
<!-- external script -->
<head>
  <script src="index.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>

  <!-- internal script block-->
  <script>
    function sayGoodbye() {
      alert("Goodbye")
    }
  </script>

  <!-- inline attribute handler-->
  <script>
    let i = 1;
  </script>
  <button onclick="alert(`i = ${i++}`)">counter</button>
</body>
```

Notice that we call the sayHello and sayGoodbye JavaScript functions from the HTML in the onclick attribute of the button element. Spectial attributes like onclick autmoatically create event listeners for different DOM events that call the code contained in the attributes value. The code specified by the attribute value can be a simple function or any JavaScript code. 



# Router
A web framework router provides essential functionality for single page applications that otherwise would have been handled by rendering multiple HTML pages. With a multiple-webpage application the headers, footers, navigation, and common components must be either duplicate in each HTML page, or injected before the server sends the page to the browser. 

With single page applications the browesr loas only one html page and then javascript is used to manipulate the DOM to make it have the appearance of multiple pages. 

This has the advantage of being able to store state as the user interacts with the page and not having to continually go to the server to get new HTML pages.

React does not have a standard router package, and there are many that you can choose from. We will use react router dom. The simplified routing functionality of react router dom derives from the project react router for its core functionality. 

A basic implementation of the router consists of a Browser Router component that encapsulates the entire application and controls the routing action. The Link, or NavLink, component captures user navigation events and modifies what is rendered by te routes component by matching up the to and path attributes. The example contains two components. The App component with the router and a Page component that is routed to when a link is pressed. 

```jsx
function Page({ color }) {
  return (
    <div className="page" style={{ backgroundColor: color}}>
      <h1>{color}</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <NavLink to="/">Red</NavLink>
          <NavLink to="/green">Green</NavLink>
          <NavLink to="/blue">Blue</NavLink>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Page color="red" />} exact />
            <Route path="/green" element={<Page color="green" />} exact />
            <Route path="/blue" element={<Page color="blue" />} exact />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

```

## Router Example
You can enhance the simple Hello World React app that you created in previous instruction to include a router by first installing the React Dom dependency.

npm install react-router-dom

