# startup
Startup for my Web Design Class, tentative name: Friendzie

This markdown file will give several key details about my start up.

![image](https://github.com/user-attachments/assets/630010b4-45ac-4084-8e8c-523bac9e26b4)

## Elevator Pitch
Remember the excietment you felt when you met and hung out with your best friends while growing up? At Friendzie, we try to capture that feeling. Unlike other social media platforms that try to keep you on them as long as possible, we focuse on helping people with similar interests meet up. Meet people in your area that have a similar taste in music, sports or anything else you could imagine. Invite people to "hang" and form groups. We focus on finding you new friends, and you get to focus on your **real** social life.

![image](https://github.com/user-attachments/assets/d2dba9c4-ad62-48f4-9628-c338298f5c7a)
(image curtesy of American Behavioral Clinic)

## Key Features:
* Invite to Hang!
    * When you find someone you like, invite them to hang out! Set a date and a place. It's that simple.
* Messaging
    * Back and forth messaging pretty standard for social media platforms
* Interests Page
    * A place where you can add your interests, and find people and groups with similar taste!
* Login Authentication
    * Exactly as it sounds.
 
![image](https://github.com/user-attachments/assets/459048dd-0be0-43c0-b8a6-b5d889caeaf4)

## Representing all technologies

* HTML: This is pretty standard and will provide the basic structure and text of my application. My application is meant to connect friends, so HTML will be vital to creating a clear UI and making sure that the App has all the nessisary information. Currently, I am planning on using 4 HTML pages. A login page, a profile page, a connect page (where people can find new friends with similar music taste) and a messaging page. 
* CSS: Obviously, I want my startup to look nice, and that is where CSS will come into play. I will use CSS to make sure that my sections, background, and text are all pleasing to my users. Good CSS implementation will be vital to a positive user experience.
* React: React will as the name suggest, help my application react to the users actions. Obviously since I am not making a personal blog, or informational site, but rather an application, I will be using a fair share of React. I will use react to create a nice login/registration form, submitting pictures, playing songs, and sending messages and invites to other users. 
* Services:
    * Connect page
    * Add friend
    * Join Group
    * Message friend
    * Invite friend
* Third party services:
    * Not too sure on the feasability or legality of this, but I would love to implement a way to share your favorite songs like instagram does.
* Authentication: This part of my program will be handeled by my login/registration form, which will be stored in my database.
* Database Data: I will use this to store information on my users, such as their name, birthday, username, password, and images.
* WebSocket Data: This will be vital to having messages sent to and from users. I don't think I will have a home/browsing page, but if I did, I might need to use websockets for those things.


## Join Groups
![image0 (2)](https://github.com/user-attachments/assets/0925bfbf-2510-4bb8-8521-8ebb1d5d359d)

## Messaging
![image1 (2)](https://github.com/user-attachments/assets/9a99bfb9-c630-479e-b022-35c8a4305267)


## Login
![image2 (1)](https://github.com/user-attachments/assets/f6c69ec5-434e-4244-b021-57ad011b6d94)


# React Part 2 Deliverables
- [X] **All functionality implemented or mocked out** - I made JavaScript for every function. Some of them, like messaging, are simply placeholders, but they still alert the user and display messages. I use a lot of local storage. The biggest chunk of work was the log in phase, because I also implemented a password recovery system. This runs off of a local port server on my machine, and I have not figured how to use Amazon web services for this, but it does work. This meant I had to add several new files of code. I even used node js so that it actually sends you a real email with a code. There is also timeout functionality, and they are given only 5 attempts, before they are locked out for 5 minutes, limiting brute force attack effectiveness. 
- [X] **Hooks** - Extensive use of useState and useEffect. This was crucial for Making the log in and password recovery system work. You can see in my startup/src/loginOTPInput.jsx file how I implemented use effect. This was crucial for my countdowns and letting me generate a random 6 digit number, and then regenerate it if needed. Again the code is sent to the email Perhaps you (or one of the TAs) could help me figure out how to run a server not on a local port. Go ahead and take a look in my startup/server directory, and peek in my app.js file. I would love to get this to work universally, but I believe backend work like that was not expected to be fully ready, and I think I fullfilled the necisary requirements for this deliverable


- [X] **Review and deploy Simon** - I cloned the Simon CSS repository and followed all the instructions, read and took notes on every tutorial, and followed the video. I then deployed Simon to my enviornment using the deployReact.sh script. 
- [X] **Implement the JavaScript code using the React Framework** - Yes. This was the bulk of my work. I took inspiration from simon on how it handeled loging in, but made some personal preference changes for my website. I made it possible for users to add new groups in discover. Doing this required me to make another jsx file called createGroup.jsx. I utilized Reacts useState and other component properties to make my website reactive. I also implemented a mock version of my messaging that displays to the screen the messages. I did not find myself needing to use useEffect, but everything that I originally planned for my website functionality is completed or mocked up, waiting for use of a future deliverable. JavaScript does change what is rendered bassed on current state and user input. 
- [X] **Deliverables 3 through 9** - Self evident, you can see both my name and my GitHub link, commit history is available, notes added, final version pushed to GitHub, deployment script used. 


