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


## Service deliverable
- [X] **Node.js/ExpressHTTP service** - I installed Express with npm. Startup is on port 4000.
- [X] **Static middleware for frontend** - Simple endponts added in service/index.js
- [X] **Calls to third party endpoints** - Like simon, I added calls to quote.cs260.click and calls to get a random image just for fun becuase it is the about page and I wanted to play with safe APIs. After that, I branched out a bit to make this my own, and used a third party API that actually sends an automated email to your email for password reset functionality. This took the brunt of my time becuase i was getting several errors. There was a lot of moving parts, but it felt really good to finally get it working. Sadly, you will not be able to see this working, becuase then I would have to share my .env file which contains variable for the email password that i use to send the automated emails, and sharing this is an obvious security problem. I can show this in person though, and I look forward to putting this on a persistent server that can do this for everyone. 
- [X] **Backend Service points** - Simple endpoints in service/index for auth and creation of groups.
- [X] **Frontend calls service endpoints** - Replaced mocked funtionality like calls to localstorage to legitimate calls to my server. 
- [X] **Supports registration, login, logout, and restricted endpoint** - Fully supports all of these. I tested and walked through them, including functionality to reset the password. 

## DB/Login deliverable
- [X] **Stores data in MongoDB** - Stored the data for my groups, so that the discover page works. 
- [X] **Stores credentials in MongoDB** - Users and Auth stored in MongoDB persistently from service/database.js. I am not pushing up my config file for security purposes, but it is connected to mongo and working. 


## WebSocket deliverable
- [X] **Backend listens for WebSocket Connection** - Backend webSocket managment executed in service/peerProxy. It parses the request url to see if the user is trying to connect to the groups notifications websocket, or if it is to connect to the direct messages websocket. It uses indicators, such as groupId, from, to, and msg. 
- [X] **Frontend makes WebSocket connection** - Because my startup was heavily focused on social and group interactivity, I had to use WebSockets extensivly. You can see that I have several dedicated files to front end websocket connection. These are stored under the discover directory. the ChatClient.js took much inspiration from the chat instruction, and is my main source of communication in the groups. This connects only users in the same group to the same websocket connection. Secondly, I have the DMChatClient, which handles calls and connections to personal messages. This happens when a user clicks on another user in the group. If the other user clicks on their profile as well, they can begin a conversation. 
- [X] **Data sent over WebSocket connection** - Sends data to the discover page. When the user enters (clicks on) a group, they enter the group. This data is sent out to everyone else in the group. If the user leaves, then they are removed from the group and are no longer displayed. This allows users to see who they are chatting with. Users chats are recorded and sent over websocket for all others to see and respond to. If a wants to send a direct message, they can enter a dm session with one of the other users in the group. This info is also sent over the websocket, allowing for real time conversation without the need to refresh the page. This also redirects to a unique messaging page. 
- [X] **WebSocket data displayed** - All messages and current users are displayed.
- [X] **Application is functional** - Added all functionality to the sight. Most of this is in the groups page. Users can create an account, log in, change a password, make a group, join a group, enter a group chat, enter a personal chat with other users in their groups, and leave a group or a personal chat. All principles taught in this semster were implemented, including the use of persistent data using mongo, extinsive use of websockets, html, css, react, and json. No mockup.