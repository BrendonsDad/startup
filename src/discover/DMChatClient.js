export class DMChatClient {
    observers = [];
    connected = false;
    socket;

    constructor(currentUserEmail, targetUserEmail, conversationId) {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        let host;
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
            host = hostname + ':4000';
        } else {
            host = window.location.host;
        }
        this.socket = new WebSocket(`${protocol}://${host}/ws/dm`);

        this.currentUserEmail = currentUserEmail;
        this.targetUserEmail = targetUserEmail;
        this.conversationId = conversationId;

        this.socket.onopen = () => {
            console.log("DM WebSocket connected.");
            this.connected = true;
            if (currentUserEmail) {
                try {
                    this.socket.send(JSON.stringify({ type: 'register', user: currentUserEmail }));
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

            let message;
            try {
                message = JSON.parse(text);
            } catch (err) {
                console.error('Failed to parse DM message JSON', text, err);
                return;
            }

            // Handle DM messages for this conversation
            if (message.type === 'dm' && (message.from === targetUserEmail || message.from === currentUserEmail)) {
                this.notifyObservers({
                    type: 'dm',
                    from: message.from,
                    msg: message.msg,
                    ts: message.ts,
                    conversationId: message.conversationId
                });
            }

            // Handle typing events
            if (message.type === 'typing' && message.from === targetUserEmail) {
                this.notifyObservers({
                    type: 'typing',
                    from: message.from
                });
            }
        };

        this.socket.onclose = () => this.connected = false;
        this.socket.onerror = (err) => console.error("DM WebSocket error:", err);
    }

    sendMessage(targetUserEmail, message, ts) {
        if (this.connected) {
            const messagePayload = {
                type: 'dm',
                from: this.currentUserEmail,
                to: targetUserEmail,
                msg: message,
                ts: ts || new Date().toISOString(),
                conversationId: this.conversationId
            };
            this.socket.send(JSON.stringify(messagePayload));
        } else {
            console.error('WebSocket not connected');
        }
    }

    sendTyping(targetUserEmail) {
        if (this.connected) {
            const typingPayload = {
                type: 'typing',
                from: this.currentUserEmail,
                to: targetUserEmail,
                conversationId: this.conversationId
            };
            this.socket.send(JSON.stringify(typingPayload));
        }
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(message) {
        this.observers.forEach(observer => observer(message));
    }

    close() {
        if (this.socket) {
            try {
                this.socket.close();
            } catch (err) {
                console.warn('Error closing DM websocket', err);
            }
        }
    }
}
