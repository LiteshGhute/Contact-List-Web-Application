const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());  //middle-ware
app.use(express.static('assets'));

// middleware1
// app.use(function(req,res,next){
//     console.log('middleware1 called');
//     next();
// });

// var contactList = [
//     {
//         name: "DJ",
//         phone: "123"
//     },
//     {
//         name: "BJ",
//         phone: "456"
//     },
//     {
//         name: "MJ",
//         phone: "549"
//     }
    
// ]

app.get('/', function(req, res){

Contact.find({}, function(err, contacts){
    if(err){
        console.log('Error in fetching contact from db');
        return;
    }

    return res.render('home',{title: "My Contact List",
                        contact_list: contacts});
    });

    
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let's Play"
    })
})

app.post('/create-contact', function(req, res){

    // contactList.push({
    //     name: req.body.name,
    // phone: req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creting the contact');
            return;
        }
        console.log('***********', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
});

app.get('/delete-contact/:id', function(req,res){
    // console.log(req.params)
    let id = req.params.id;   //get the query from the url

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    //find the contact in db and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting from db');
            return;
        }
        return res.redirect('back');

    });

});

app.listen(port, function(err){
    if(err){
        console.log('Error',err);
    }
    console.log('Express server is running on: ',port);
});