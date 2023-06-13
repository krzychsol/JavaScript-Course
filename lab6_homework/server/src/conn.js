const { MongoClient, ServerApiVersion } = require('mongodb');

const DATABASE_NAME = 'agroturystyka';
const ROOM_COLLECTION_NAME = 'rooms';
const USER_COLLECTION_NAME = 'users';
const URI = 'mongodb+srv://root:root@cluster0.yezvdsh.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(URI, 
    { 
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
     });

let db = null;
let roomCollection = null;
let userCollection = null;
let connection = null;

const init = async () => {
    try{
        connection = await client.connect();
        db = connection.db(DATABASE_NAME);
        roomCollection = db.collection(ROOM_COLLECTION_NAME);
        userCollection = db.collection(USER_COLLECTION_NAME);
        console.log('Connected to database');
    }
    catch(err){
        console.log(err);
    }
};

const getRooms = async () => {
    const rooms = [];
    const cursor = await roomCollection.find({});
    await cursor.forEach(doc => rooms.push(doc));
    return rooms;
};

const getUsers = async () => { 
    const users = [];
    const cursor = await userCollection.find({});
    await cursor.forEach(doc => users.push(doc));
    return users;
}

const addRoom = async (room) => {
    try{
        await roomCollection.insertOne(room);
    }
    catch(err){
        console.log(err);
    }
};

const updateRoom = async (id, room) => {
    try{
        await roomCollection.updateOne({ _id: ObjectId(id) }, { $set: room });
    }
    catch(err){
        console.log(err);
    }
}

const deleteRoom = async (id) => {
    try{
        await roomCollection.deleteOne({ _id: ObjectId(id) });
    }
    catch(err){
        console.log(err);
    }
}

module .exports = { init, getRooms, addRoom, deleteRoom, updateRoom, getUsers };