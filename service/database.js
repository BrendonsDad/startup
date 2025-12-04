const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const groupCollection = db.collection('group');

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

function getUserByToken(token) {
    return userCollection.findOne({ token: token })
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, {$set: user})
}

async function removeUserFromGroup(groupId, userId) {
    const result = await groupCollection.updateOne(
        {name: groupId}, 
        { $pull: { users: userId}}
    );
    return result;
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

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addGroup,
    getGroups,
    AddUserToGroup,
    getGroupUsers,
    removeUserFromGroup,
};