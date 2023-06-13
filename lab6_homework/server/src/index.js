const express = require('express');
const cors = require('cors');
const rooms = require('./routes/rooms');
const users = require('./routes/users');
const { init } = require('./conn');

const app = express();
const PORT = process.env.PORT || 8080;
const SERVER_URL = process.env.SERVER_URL || `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', users);
app.use('/rooms', rooms);

app.listen(PORT, async () => {
    await init();
    console.log(`Server started on port ${PORT}`);
    console.log(`Server url: ${SERVER_URL}`);
    console.log(`Press Ctrl + C for stop server`);
});