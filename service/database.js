const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const groupCollection = db.collection('group');
const conversationCollection = db.collection('conversations');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} becuase ${ex.message}`)
        process.exit(1);
    }
})();

function getUser(email) {
    return userCollection.findOne({ email: email });
}

// Add message object to group's chat array
async function addGroupMessage(groupName, messageObj) {
    // Push the message and keep only the last 500 messages to avoid unbounded growth
    const result = await groupCollection.updateOne(
        { name: groupName },
        {
            $push: { chats: { $each: [messageObj], $slice: -500 } },
            $setOnInsert: { name: groupName, users: [] }
        },
        { upsert: true }
    );
    return result;
}

// Fetch recent chats for group 
async function getGroupChats(groupName, limit = 200) {
    const g = await groupCollection.findOne({ name: groupName }, { projection: { chats: 1 } });
    if (!g || !g.chats) return [];
    const start = Math.max(0, g.chats.length - limit);
    return g.chats.slice(start);
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token })
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, {$set: user})
}


async function AddUserToGroup(groupName, userName) {

    try {
        const result = await groupCollection.updateOne(
            {name: groupName},
            { $push: { users: userName } }
        );

        if (result.matchedCount === 0) {
            console.log(`Group not found with name: ${groupName}`);
            return false;
        } else if (result.modifiedCount === 1) {
            console.log(`Successfully added user to group: ${groupName}`)
            return true;
        } else {
            //  Handle case where the document was found but nothing was modified
            return false;
        }
    } catch (error) {
        console.error("Error adding user to group:", error);
        throw error; // Re-throw  the error for upstream handling
    }

}

async function getGroupUsers(groupName) {
    try {
        const group = await groupCollection.findOne({ name: groupName }, { projection: { users: 1, _id: 0 } });

        if (group) {
            return group.users;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching group users:", error);
        throw error; 
    }
}

async function addGroup(group) {
    return groupCollection.insertOne(group);
}

function getGroups() {
    const cursor = groupCollection.find();
    return cursor.toArray();
}

// ===== CONVERSATION FUNCTIONS =====

// Create a new conversation between two users
async function createConversation(userEmailA, userEmailB) {
    // Sort emails alphabetically for consistent lookup
    const participants = [userEmailA, userEmailB].sort();
    
    const conversation = {
        participants,
        messages: [],
        unreadBy: [userEmailB], // Initially, only userB hasn't read (userA is creating it)
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    const result = await conversationCollection.insertOne(conversation);
    const conversationId = result.insertedId;
    
    // Add conversation ID to both users' conversationIds array
    await userCollection.updateOne(
        { email: userEmailA },
        { $push: { conversationIds: conversationId } }
    );
    
    await userCollection.updateOne(
        { email: userEmailB },
        { $push: { conversationIds: conversationId } }
    );
    
    return conversationId;
}

// Get or create conversation between two users
async function getOrCreateConversation(userEmailA, userEmailB) {
    const participants = [userEmailA, userEmailB].sort();
    
    let conversation = await conversationCollection.findOne({ participants });
    
    if (!conversation) {
        const conversationId = await createConversation(userEmailA, userEmailB);
        conversation = await conversationCollection.findOne({ _id: conversationId });
    }
    
    return conversation;
}

// Get conversation by ID (with security check)
async function getConversation(conversationId, userEmail) {
    const { ObjectId } = require('mongodb');
    const conversation = await conversationCollection.findOne({ _id: new ObjectId(conversationId) });
    
    // Security check: ensure the requester is one of the participants
    if (!conversation || !conversation.participants.includes(userEmail)) {
        return null;
    }
    
    return conversation;
}

// Add a message to a conversation
async function addDMMessage(conversationId, messageObj, senderEmail) {
    const { ObjectId } = require('mongodb');
    
    // Add message and mark as unread for the other participant
    const result = await conversationCollection.updateOne(
        { _id: new ObjectId(conversationId) },
        {
            $push: { messages: messageObj },
            $set: { updatedAt: new Date() },
            $addToSet: { unreadBy: { $each: getUnreadRecipient(conversationId, senderEmail) } }
        }
    );
    return result;
}

// Mark a conversation as read for a user
async function markConversationAsRead(conversationId, userEmail) {
    const { ObjectId } = require('mongodb');
    const result = await conversationCollection.updateOne(
        { _id: new ObjectId(conversationId) },
        { $pull: { unreadBy: userEmail } }
    );
    return result;
}

// Helper to get unread recipient (not the sender)
function getUnreadRecipient(conversationId, senderEmail) {
    // This will be called in context where we know the participants
    // For now, we'll handle this in the API layer
    return [];
}

// Get all conversations for a user
async function getUserConversations(userEmail) {
    const user = await userCollection.findOne({ email: userEmail }, { projection: { conversationIds: 1 } });
    
    if (!user || !user.conversationIds || user.conversationIds.length === 0) {
        return [];
    }
    
    const { ObjectId } = require('mongodb');
    const conversations = await conversationCollection.find({
        _id: { $in: user.conversationIds.map(id => new ObjectId(id)) }
    }).toArray();
    
    // Sort by most recent message
    conversations.sort((a, b) => {
        const timeA = a.updatedAt ? new Date(a.updatedAt) : new Date(a.createdAt);
        const timeB = b.updatedAt ? new Date(b.updatedAt) : new Date(b.createdAt);
        return timeB - timeA;
    });
    
    return conversations;
}

// Get the other participant's email from a conversation
function getOtherParticipant(conversation, userEmail) {
    return conversation.participants.find(p => p !== userEmail);
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addGroup,
    getGroups,
    AddUserToGroup,
    getGroupUsers,
    addGroupMessage,
    getGroupChats,
    createConversation,
    getOrCreateConversation,
    getConversation,
    addDMMessage,
    getUserConversations,
    getOtherParticipant,
    markConversationAsRead,
};