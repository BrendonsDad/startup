export class DMChatClient {
    observers = [];
    connected = false;
    socket;

    constructor(currentUserName, targetUserName) {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        // Connect to backend: use :4000 only for local dev, otherwise same-origin
        // Thank you TA Horizon for helping me dubug this
        let host;
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
            host = hostname + ':4000';
        } else {
            host = window.location.host;
        }
        this.socket = new WebSocket(`${protocol}://${host}/ws/dm`);

        this.currentUserName = currentUserName;

        this.socket.onopen = () => {
            console.log("DM WebSocket connected.");
            this.connected = true;
            if (currentUserName) {
                try {
                    this.socket.send(JSON.stringify({ type: 'register', user: currentUserName }));
                } catch (err) {
                    console.error('Failed to send DM registration', err);
                }
            }
        };

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
                console.error('Failed to read DM message payload', err, event.data);
                return;
            }

            let chat;
            try {
                chat = JSON.parse(text);
            } catch (err) {
                console.error('Failed to parse DM message JSON', text, err);
                return;
            }

            this.notifyObservers(chat.from, chat.msg);
        };

        this.socket.onclose = () => this.connected = false;
        this.socket.onerror = (err) => console.error("DM WebSocket error:", err);
    }

    sendMessage(targetUserName, message) {
        if (this.connected) {
            const messagePayload = {
                from: this.currentUserName,
                to: targetUserName,
                msg: message,
            };
            this.socket.send(JSON.stringify(messagePayload));
        }
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(fromUser, message) {
        this.observers.forEach(observer => observer(fromUser, message));
    }
}