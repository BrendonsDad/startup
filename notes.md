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