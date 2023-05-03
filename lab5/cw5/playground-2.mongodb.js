// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('agh');

// Create a new document in the collection.
db.getCollection('students').insertMany([{
        fname: 'Jan',
        lname: 'Kowalski',
        faculty: 'IET'
    },
    {
        fname: 'Mariola',
        lname: 'Nowak',
        faculty: 'IET'
    },
    {
        fname: 'Marek',
        lname: 'Stach',
        faculty: 'AIR'
    },
    {
        fname: 'Wiktoria',
        lname: 'Nowak',
        faculty: 'IET'
    }
]);
