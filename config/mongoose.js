// Require the library
const mongoose = require('mongoose');

// Connect to the Database
mongoose.connect('mongodb://127.0.0.1/contacts_list_db');

// aquire the connection tocheckif itis successful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the msg
db.once('open' , () => {
    console.log("Successfully connected to the database");
})