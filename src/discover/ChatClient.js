export class ChatClient {
        observers = [];
        connected = false;

        constructor(groupId) {
            const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
            this.socket = new WebSocket(`${protocol}://${window.location.host}/ws/${groupId}`);

            //display that we have opened the webSocket
            this.socket.onopen = (event) => {
                this.notifyObservers('system', 'websocket', 'connected');
                this.connected = true;
            };

            // display messages we received from our friends
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

        removeObserver(observer) {
            const index = this.observers.indexOf(observer);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        }

        notifyObservers(event, from, msg) {
            this.observers.forEach((h) => h({ event, from , msg }));
        }
    }