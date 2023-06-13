const express = require('express');
const path = require('path');
const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const APPLICATION_URL = process.env.APPLICATION_URL || `http://localhost:${PORT}`;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:8080';

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', asyncHandler(async (req, res) => {

    const rooms = await fetch(`${SERVER_URL}/rooms`)
    .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
    });

    const users = await fetch(`${SERVER_URL}/users`)
    .then(res => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
    });

    res.render('home', { 
    title: 'Home', 
    APPLICATION_URL: APPLICATION_URL, 
    SERVER_URL: SERVER_URL, 
    rooms: rooms,
    reservedRooms: rooms.filter(room => room.borrowers.length > 0),
    freeRooms: rooms.filter(room => room.borrowers.length === 0),
    users: users
    });
}));


app.get('/admin', (req, res) => {
    res.render('admin', {
        APPLICATION_URL: APPLICATION_URL,
        addRoomTextInputs: [ 'bathroom', 'beds', 'description', 'maxGuests', 'price' ]
    });
});

app.get('/guest', (req, res) => {
    res.render('guest', { APPLICATION_URL: APPLICATION_URL });
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Application url: ${APPLICATION_URL}`);
    console.log(`Server url: ${SERVER_URL}`);
    console.log(`Press Ctrl + C for stop server`);
});
