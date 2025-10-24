# Midterm Review
<!-- DISCLAIMER: I was told by the TAs that I can use my notes in this notesorganzied directory. I was also told that I can have any notes as long as they don't link to an online website, and that I do not run any code. These notes are in accordance with those principles.  -->

## Link 
1. What does the <link> element do?
- Defines the relationship between the current document and an external resource
- Common uses: 
-   linking an external CSS stylesheet: <link rel="stylesheet" href="styles.css">
-   Including a favicon: <link rel="icon" href="favicon.png" type="image/png">


## Div
2. What does a <div> tag do?
- Generic block level contiainer element. Doesn't inherently carry meaning but is used to group other HTML elements together.

### TA
What does a div tag do?
 <div> is a container element used to group other HTML elements together. It has no visual
 effect by itself, but helps structure the page for styling and layout using CSS. Commonly used
 for sections, wrappers, and layout blocks.
 <div>
  <p>This is inside a div</p>
 </div>
 In this example, the paragraph is grouped inside a div, which can be styled or positioned together.

## Difference between #title and .grid
- #title is an ID selector. Targets an element with id="title"
- .grid is a class selector meaning it targets one or more elements that hace class="grid"
- ID should be unique on the page (one element) wheras many elements can share a class. 
- In CSS specificity, an ID selector has higher specificty than a class selector (so style in #title will generally override those in .grid if they conflict)


## Dif between PADDING and MARGIN
- Padding is the space inside the elements border, between the content and the border
- Margin is the space outside the elements border, between the border and other elements. 
- The ordering (from inside to outside) is content -> padding -> border -> margin. 

## Given this HTML and this CSS how will the images be displayed using flex?
 If the container uses display: flex;, the images will be displayed in a row by default, side by side, unless
 flex-direction: column; is specified.

## What does the following padding CSS do?
- If you have a rule like padding: 20px 10px 30px 5px; the short hand means:
    - Top padding: 20px
    - Right padding: 10px
    - bottom padding: 30px
    - Left padding: 5px

if only one value is given (padding: 10px) then all four sides get 10px.
- if two values (padding: 10px 20px) then top and bottom = 10px and left and right equal 20px
- If three values: (padding: 10px 20px 30px) then top=10px, left and right= 20px, and bottom = 30px

## What does Arraw syntax function declaration do?

```javascript
const doSomething = (param1, param2) => {
    return param1 + param2;
};

```

This declares a function doSomething that takes two parameters and returns their sum. 
Arrow functions differ from traditional function declarations in a few ways
- They do not have their own this binding (they use lexical this)
- they are often more concise

### TA Arrows
 Arrow functions are a compact function syntax. (a, b) => a + b means a function with parameters a and b that
 returns a+b.
 Examples:
 const add = (a, b) => a + b;
 const greet = name => `Hi ${name}`;
 const square = x => { return x * x; } // block form
 Note: arrow functions do not bind their own 'this' and are not suitable as constructors.

## What does Map with an array output
In JavaScript, array.map(...) returns a new array by applying the callback function to each element of the original array

```js
const arr = [1, 2, 3]
const doubled = arr.map(x => x * 2);
console.log(doubled); // [2, 4, 6]
```
So given some array and using map, you'll get a new array whose elements are whatever the callback returns for each original element.

## getElementById and addEventListener

```js
const btn = document.getElementById("myButton");
btn.addEventListener("click", () => {
    console.log("btton clicked!");
});

```
This selects the element whose id="myButton" and adds an event listener so that when that element is clicked, the callback is executed (in this example, logging “Button clicked!”).
So the code outputs something (e.g., a message) when the user interacts (e.g., clicks) that element.
If you provide the exact snippet I can say exactly what it outputs.

### TA
Typical pattern:
 const btn = document.getElementById('btn');
 btn.addEventListener('click', () => console.log('Clicked!'));
 Behavior: When user clicks the element with id 'btn', the callback runs and prints 'Clicked!'.

## What does the following line of Javascript do using a # selector?
In JavaScript you might see something like

```js
document.querySelector("#myId").style.color = "green";
```
Here #myId is a CSS-style selector for an element with id="myId". So the code selects that element and then (in this case) changes its style (the color to green).
In summary: using #something in querySelector or in CSS refers to the element whose id equals “something”.

## Which of the following are true? (mark all that are true about the DOM)
Here are some truths about the DOM (Document Object Model):

It’s a tree-structure representation of the HTML (and XML) document where elements are nodes.

You can manipulate it via JavaScript (e.g., add/remove elements, change attributes, handle events).

Changes to the DOM (via script) cause the browser to re-render or update the visible page (depending on what changed).

The DOM API provides methods like getElementById, querySelector, addEventListener, createElement, etc.

Each HTML element, attribute, text node becomes a part of the DOM.

If you give me the list of statements I can mark which are true or false.

### TA
 The DOM represents the HTML document as a tree of objects. You can use JavaScript to access and modify
 DOM elements. Each HTML element is a node in the DOM.

## By default, the HTML <span> element has a default CSS display property value of:
The <span> element is an inline element by default. So its default display is inline.

## How would you use CSS to change all the div elements to have a backgournd color of red?
```css
div {
  background-color: red;
}
```

## How would you display an image with a hyperlink in HTML?
```html
<a href="https://example.com">
  <img src="image.jpg" alt="An image">
</a>
```

## In the CSS box model, what is the ordering of the box layers starting at the inside and working out
1. Content
2. Padding
3. Border
4. Margin

## Given the following HTML, what CSS would you use to set the text “trouble” to green and leave the “double” text unaffected?
Suppose the HTML looks like:
```html
<p>I’m in trouble and double here.</p>
```
If you want only the “trouble” word green, you would need to wrap “trouble” in a span (or other container) and assign it a class or id. For example:

```html
<p>I’m in <span class="greenText">trouble</span> and double here.</p>
```

Then CSS
```css
.greenText {
  color: green;
}
```

## What will the following code output when executed using a for loop and console.log?
```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```
this outputs
0
1
2
3
4


## How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
```js
const element = document.getElementById("byu");
element.style.color = "green";
```
or using querySelector
```js
document.querySelector("#byu").style.color = "green";
```

## What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?

Paragraph: <p>

Ordered list: <ol>

Unordered list: <ul>

Second level heading: <h2>

First level heading: <h1>

Third level heading: <h3>

## How do you declare the document type to be HTML?

```html
<!DOCTYPE html>
```
This declares the document is HTML5


## What is valid JavaScript syntax for if, else, for, while, switch statements?

Here are basics

``` js
//if/else
if (condition) {
  // do something
} else if (anotherCondition) {
  // do another thing
} else {
  // fallback
}


//for
for (let i = 0; i < 10; i++) {
  // loop body
}


//while
while (condition) {
  // repeat
}


//switch
switch (variable) {
  case "value1":
    // code
    break;
  case "value2":
    // code
    break;
  default:
    // default code
}
```

## What is the correct syntax for creating a javascript object

you cna create an object using object literal syntax
```js
const person = {
  name: "Alice",
  age: 30,
  greet: function() {
    console.log("Hello!");
  }
};
```

or using the shorthand methods
```js
const person = {
  name: "Alice",
  age: 30,
  greet() {
    console.log("Hello!");
  }
};
```

## Is it possible to add new properties to JavaScript objects?
Yes — you can add new properties to JavaScript objects at any time. Example

```js
const obj = { a: 1 };
obj.b = 2;
```

Now obj has property b. Unless the object is frozen or sealed, you generally can add or remove properties.

## If you want to include JavaScript on an HTML page, which tag do you use?

You use the <script> tag, example
```html
<script src="script.js"></script>
```
or inline
```html
<script>
  console.log("Hello!");
</script>
```

## Given the following HTML, what JavaScript could you use to set the text “animal” to “crow” and leave the “fish” text unaffected?

Suppose the HTML is something like 
```html
<p id="animal">animal</p>
<p id="fish">fish</p>
```

then js

```js
document.getElementById("animal").textContent = "crow";
```

This will change the first <p> to show “crow” and the second remains “fish”.


## TA
<p id="animal">animal</p>
 <p id="fish">fish</p>
 Option 1 (direct):
 document.getElementById('animal').textContent = 'crow';
 Option 2 (variable):
 const animal = document.getElementById('animal');
 animal.textContent = 'crow';
 Both work; second is clearer if reusing element.

## Which of the following correctly describes JSON?
JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is text-based, human-readable, and is used for data exchange between systems. It looks like JavaScript object literal syntax but is a string format. Example:
```json
{
  "name": "Alice",
  "age": 30,
  "skills": ["JS","CSS","HTML"]
}

```

## What do the console commands chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?

Here’s a quick overview (in Linux/Unix systems):

pwd: print working directory — shows the current directory path.

cd: change directory.

ls: list directory contents. With -la parameter (see next) it shows all files including hidden, in long format.

chmod: change file mode / permissions.

mkdir: make a new directory.

mv: move or rename files/directories.

rm: remove (delete) files or directories.

vim / nano: editors for editing files (vim is more advanced).

man: manual — show the manual/help for a command.

ssh: secure shell — connect to a remote machine via secure shell protocol.

ps: list running processes.

wget: download files from the web via command line.

sudo: run a command with superuser (root) privileges.

### TA
 chmod - change permissions, pwd - print working directory, cd - change directory, ls - list files, vim/nano - text
 editors, mkdir - make directory, mv - move/rename, rm - remove, man - manual, ssh - remote shell, ps 
processes, wget - download files, sudo - run as admin

## Which of the following console command creates a remote shell session?

The command that creates a remote shell session is ssh (secure shell).

ssh


## Which of the following is true when the -la parameter is specified for the ls console command?

When you use ls -la on Unix/Linux:

-l means “long listing format” (shows permissions, owner, group, size, modification date, etc).

-a means “all files” including hidden files (those whose names begin with a dot).
So ls -la lists all files (including hidden) in long format.



## Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?

In banana.fruit.bozo.click:

The top-level domain (TLD) is click.

The root domain (also sometimes called “second-level domain” depending on context) is bozo.click — basically bozo plus the TLD click.

fruit.bozo.click is a subdomain of bozo.click.

banana.fruit.bozo.click is a further subdomain under fruit.bozo.click.

## TA
 TLD: .click, root domain: bozo.click, subdomain: fruit.bozo.click (and banana.fruit.bozo.click is a nested
 subdomain)


## Is a web certificate necessary to use HTTPS?

Yes — to use HTTPS you generally need a TLS/SSL certificate installed on the server. This certificate is used to establish a secure (encrypted) connection between client and server. Without a valid certificate, browsers will warn users.



## Can a DNS A record point to an IP address or another A record?

A DNS A record (Address record) points a domain name to a specific IPv4 address. It cannot directly point to another A record; that would typically be done with a CNAME record (alias). So:

A record → IPv4 address.

CNAME → alias pointing to another domain name which then resolves (perhaps via A record) to an IP.

### TA
 A DNS A record points to an IP address; it should not point to another A record.



## Ports 443, 80, 22 are reserved for which protocol?

Port 80: HTTP (unencrypted web traffic).

Port 443: HTTPS (HTTP over TLS/SSL) — secure web traffic.

Port 22: SSH (Secure Shell) — remote command line access.





## What will the following code using Promises output when executed?

Without seeing the exact Promise code I’ll describe the pattern:

```js
new Promise((resolve, reject) => {
  resolve("Success!");
}).then(result => {
  console.log(result);
});
```

This will output: Success!
If there is a reject(...), then a .catch(...) would handle the error. If you provide the concrete snippet, I can tell you exactly what happens, including order of execution (promises are asynchronous, so .then() callbacks run after current call-stack completes, etc.).

### TA
 Many possibilities depending on promise behavior. Examples:
 1) Promise.resolve('Done').then(console.log) -> 'Done'
 2) Promise.reject('Error').catch(console.error) -> 'Error'
 3) new Promise(res => setTimeout(() => res('Hi'),1000)).then(console.log) -> 'Hi' after 1s
 4) Async function returns value -> printed when awaited or .then
 5) Promise chain: Promise.resolve(2).then(x=>x*2).then(x=>x+1).then(console.log) -> 5
 6) Reject handled -> shows error via catch