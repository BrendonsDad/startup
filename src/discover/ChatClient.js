export class ChatClient {
        observers = [];
        presenceObservers = [];
        connected = false;

        constructor(groupId) {
            const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
            const backendPort = 4000;
            const host = window.location.hostname + ':' + backendPort;
            this.socket = new WebSocket(`${protocol}://${host}/ws/${groupId}`);

            this.socket.onerror = (err) => {
                console.error('WebSocket error', err);
            };

            this.socket.onopen = (event) => {
                this.notifyObservers('system', 'websocket', 'connected');
                this.connected = true;
            };

            // display messages we received from our friends
            this.socket.onmessage = async (event) => {
                let text;
                try {
                    if (typeof event.data === 'string') {
                        text = event.data;
                    } else if (event.data && typeof event.data.text === 'function') {
                        text = await event.data.text();
                    } else {
                        text = JSON.stringify(event.data);
                    }
                } catch (err) {
                    console.error('Failed to read websocket message payload', err, event.data);
                    return;
                }

                let data;
                try {
                    data = JSON.parse(text);
                } catch (err) {
                    console.error('Failed to parse websocket message as JSON', text, err);
                    return;
                }

                // Handle user list (initial users in group)
                if (data.type === 'userList') {
                    this.notifyUserListObservers(data.users);
                }
                // Handle user presence events (join/leave)
                else if (data.type === 'userPresence') {
                    this.notifyPresenceObservers(data.event, data.user);
                } else {
                    // Handle regular chat messages
                    this.notifyObservers('received', data.name, data.msg);
                }
            };

            this.socket.onclose = (event) => {
                this.notifyObservers('system', 'websocket', 'disconnected');
                this.connected = false;
            };
        }

        sendMessage(name, msg) {
            this.notifyObservers('sent', 'me', msg);
            this.socket.send(JSON.stringify({ name, msg }));
        }

        registerUser(name) {
            this.socket.send(JSON.stringify({ type: 'register', name }));
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

        addPresenceObserver(observer) {
            this.presenceObservers.push(observer);
        }

        removePresenceObserver(observer) {
            const index = this.presenceObservers.indexOf(observer);
            if (index > -1) {
                this.presenceObservers.splice(index, 1);
            }
        }

        notifyObservers(event, from, msg) {
            this.observers.forEach((h) => h({ event, from , msg }));
        }

        notifyPresenceObservers(event, user) {
            this.presenceObservers.forEach((h) => h({ event, user }));
        }

        addUserListObserver(observer) {
            if (!this.userListObservers) {
                this.userListObservers = [];
            }
            this.userListObservers.push(observer);
        }

        removeUserListObserver(observer) {
            if (!this.userListObservers) return;
            const index = this.userListObservers.indexOf(observer);
            if (index > -1) {
                this.userListObservers.splice(index, 1);
            }
        }

        notifyUserListObservers(users) {
            if (!this.userListObservers) return;
            this.userListObservers.forEach((h) => h(users));
        }

        close() {
            try {
                if (this.socket) this.socket.close();
            } catch (err) {
                console.warn('Error closing websocket', err);
            }
        }
    }