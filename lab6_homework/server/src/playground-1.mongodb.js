/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'agroturystyka';
const collection = 'rooms';
const collection2 = 'users';

// Create a new database.
use(database);

// Create a new collection.
//db.createCollection(collection);
//db.createCollection(collection2);

//Insert many documents into a collection.
db.rooms.insertMany([
    {
        "bathrooms": 2,
        "beds": 2,
        "description": "Pokój w stylu rustykalnym",
        "maxGuests": 2,
        "price": 100,
        "borrowers": [
            { 
              "name": "Marcin",
              "surname": "Kowalski",
              "email": "mkowalski@example.com",
              "phone": "123456789",
              "address": "ul. Kowalska 1, 00-000 Warszawa"
            }
        ],
        "name": "Pokój w stylu rustykalnym",
    },
  ]);
