const express = require('express');
const router = express.Router();
const { getRooms, getUsers } = require('../conn');

//Get all users
router.get('/', async (req, res) => {
    res.set(res.locals.headers);
    res.status(200).json(await getUsers());
});

//Get all rooms
router.get('/', async (req, res) => {
    res.set(res.locals.headers);
    res.status(200).json(await getRooms());
});

module.exports = router;