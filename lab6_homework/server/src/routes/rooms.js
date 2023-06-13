const express = require('express');
const router = express.Router();
const { getRooms, addRoom, deleteRoom, updateRoom } = require('../conn');
const { ObjectId } = require('mongodb');

//Get all rooms
router.get('/', async (req, res) => {
    res.set(res.locals.headers);
    res.status(200).json(await getRooms());
});

//Add new room
router.post('/', async (req, res) => {
    res.set(res.locals.headers);
    const room = req.body;
    await addRoom(room);
    res.status(201).json({ message: 'Room added successfully' });
});

//Delete room
router.delete('/:id', async (req, res) => {
    res.set(res.locals.headers);
    const id = req.params.id;
    await deleteRoom(id);
    res.status(200).json({ message: 'Room deleted successfully' });
});

//Update room
router.put('/:id', async (req, res) => {
    res.set(res.locals.headers);
    const id = req.params.id;
    const room = req.body;
    await updateRoom(id, room);
    res.status(200).json({ message: 'Room updated successfully' });
});

module.exports = router;