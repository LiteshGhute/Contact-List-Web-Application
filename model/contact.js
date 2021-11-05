const mongoose = require('mongoose');

const contatSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contatSchema);

module.exports = Contact;