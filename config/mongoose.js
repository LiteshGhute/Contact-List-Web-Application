//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection (to check successful)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,"error in connecting db"));

//successfully connected msg
db.once('open',function(){
    console.log('Successfully connected to db');
});
