export class ChatClient {
        observers = [];
        presenceObservers = [];
        connected = false;

        constructor(groupId) {
            const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
            let host;
            const hostname = window.location.hostname;
            if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
                host = hostname + ':4000';
            } else {
                host = window.location.host;
            }
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

                if (data.type === 'chatHistory' || data.type === 'history') {
                    this.notifyObservers('history', null, data.chats);
                    return;
                }

                // Handle user list (initial users in group)
                if (data.type === 'userList') {
                    this.notifyUserListObservers(data.users);
                }
                // Handle user presence events (join/leave)
                else if (data.type === 'userPresence') {
                    this.notifyPresenceObservers(data.event, data.user);
                } else if (data.type === 'chat') {
                    // structured chat message from server
                    this.notifyObservers('received', data.from || data.name, data.msg, data.ts);
                } else {
                    // Handle legacy/other chat message shapes
                    this.notifyObservers('received', data.name || data.from, data.msg);
                }
            };

            this.socket.onclose = (event) => {
                this.notifyObservers('system', 'websocket', 'disconnected');
                this.connected = false;
            };
        }

        sendMessage(name, msg) {
            const ts = new Date().toISOString();
            const payload = {
                type: 'chat',
                name,
                msg,
                ts
            };
            this.notifyObservers('sent', 'Me', msg, ts);
            this.socket.send(JSON.stringify(payload));
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

        notifyObservers(event, from, msg, ts) {
            this.observers.forEach((h) => h({ event, from, msg, ts }));
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