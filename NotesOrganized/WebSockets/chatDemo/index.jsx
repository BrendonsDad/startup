import React from 'react';
import ReactDOM from 'react-dom/client';


/*
The Chat component introduces a state variable for the user's name and injects
three sub-components: Name, Message, and conversation. The Name component allows
the user to specify what name they want to associate with their message. The 
Message component allows the user to create and send a message. The Conversation
component displays the chat messages. Using component properties we can share the
ability to access the name and webSocket communication object. 
*/
function Chat({ webSocket }) {
  const [name, setName] = React.useState('');

  return (
    <main>
      <Name updateName={setName} />
      <Message name={name} webSocket={webSocket} />
      <Conversation webSocket={webSocket} />
    </main>
  );
}

/*
The name component implements a simple input element that uses the updateName
function to change the name used by the entire application. 
*/
function Name({ updateName }) {
  return (
    <main>
      <div className='name'>
        <fieldset id='name-controls'>
          <legend>My Name</legend>
          <input onChange={(e) => updateName(e.target.value)} id='my-name' type='text' />
        </fieldset>
      </div>
    </main>
  );
}

/*
The Message component provides an input element for chat text as well as a button
for sending the message. Notice that if disabled evaluates to true, then the chat
box and button are disabled. The doneMessage function provides alternative message
sending capability that is initiated when the return key is pressed. The sendMsg
function calls the sendMessage method on the 'webSocket' object to send the message
to other users, and also calls the setMessage function to allow other components to
process what the user has inputed
*/
function Message({ name, webSocket }) {
  const [message, setMessage] = React.useState('');

  function doneMessage(e) {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  function sendMsg() {
    webSocket.sendMessage(name, message);
    setMessage('');
  }

  const disabled = name === '' || !webSocket.connected;
  return (
    <main>
      <fieldset id='chat-controls'>
        <legend>Chat</legend>
        <input disabled={disabled} onKeyDown={(e) => doneMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)} type='text' />
        <button disabled={disabled || !message} onClick={sendMsg}>
          Send
        </button>
      </fieldset>
    </main>
  );
}

/*
The Conversation component provides a place for tchat messages to be displayed. It
maintains a list of all chats in the chats state variable and dynamically creates 
jsx to render the conversation.
*/
function Conversation({ webSocket }) {
  const [chats, setChats] = React.useState([]);
  React.useEffect(() => {
    webSocket.addObserver((chat) => {
      setChats((prevMessages) => [...prevMessages, chat]);
    });
  }, [webSocket]);

  const chatEls = chats.map((chat, index) => (
    <div key={index}>
      <span className={chat.event}>{chat.from}</span> {chat.msg}
    </div>
  ));

  return (
    <main>
      <div id='chat-text'>{chatEls}</div>
    </main>
  );
}

/*
Finally we add the ChatClient class. the ChatClient class manages the webSocket in 
order to connect, send, and recieve WebSocket messages

In order to properly handle both secure and insecure WebSocket connections, the
ChatClient examines what protocol is currently being used for HTTP communication 
as represented by the browser's window.location.protocol variable. If it is 
non-secure HTTP then se set our WebSocket protocol to be non-Secure WebSocket (ws) 
Otherwise we use secure WebSocket (wss). With the correct protocol in hand, we then 
connect the WebSocket to the same location that we loaded the HTML from by 
referencing the window.location.host variable. 

We then register several listeners on the websocket connection. This includes the 
onopen, onmessage and onclose events. The ChatClient interacts with the React 
components by allowing them to register as observers for when chat messages are 
recieved. Then when the WebSocket events are triggered, the ChatClient can notify
the observers of the events. 
*/
class ChatClient {
  observers = [];
  connected = false;

  constructor() {
    // Adjust the webSocket protocol to what is being used for HTTP
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    this.socket.onopen = (event) => {
      this.notifyObservers('system', 'websocket', 'connected');
      this.connected = true;
    };

    // Display messages we receive from our friends
    this.socket.onmessage = async (event) => {
      const text = await event.data.text();
      const chat = JSON.parse(text);
      this.notifyObservers('received', chat.name, chat.msg);
    };

    // If the webSocket is closed then disable the interface
    this.socket.onclose = (event) => {
      this.notifyObservers('system', 'websocket', 'disconnected');
      this.connected = false;
    };
  }

  // Send a message over the webSocket
  sendMessage(name, msg) {
    this.notifyObservers('sent', 'me', msg);
    this.socket.send(JSON.stringify({ name, msg }));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, from, msg) {
    this.observers.forEach((h) => h({ event, from, msg }));
  }
}

/*
You complete the frontend code by loading the Chat component into the DOM and pass
it a WebSocket ChatClient
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Chat webSocket={new ChatClient()} />);