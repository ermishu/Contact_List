// import  express from 'express' used when in package.json ("type" = "module")
const express = require('express');

// path is a nodemodule  used to access the file path
const path = require('path');

// Set the port on which localhost is running
const port = 3000;

// import the database mongoose from config 
const db = require('./config/mongoose');

// import the model "contact"
const Contact = require('./models/contact')

// To Start the app by calling express function
const app = express();

// set the viewengine Key - value
app.set('view engine', 'ejs');

// Set the views folder Path
app.set('views', './views');

// Middleware

//this method is to parse the incoming request with urlencoded payloads and is based upon the body-parser.(Form Submission)
app.use(express.urlencoded());

// set the assets folder path
app.use(express.static("assets"));


// Fetching the database and render the page
app.get('/', (req, res) => {


    try {
        Contact.find()
            .then(contacts => {
                return res.render('home', {
                    title: "Contact List",
                    contacts: contacts
                })
            })
            .catch(err => {
                if (err) {
                    console.log('error in finding contact from db', err);
                    return;
                }
            })
    } catch (error) {
        if (error) {
            res.redirect('back')
        }
    }
})

// creating the contact
app.post('/create-contact', (req, res) => {

    try {

        Contact.create(req.body)
            .then(newContact => {
                console.log('****', newContact);
                // contactList.push(newContact)
                return res.redirect('/')
            })
            .catch(err => {
                if (err) {
                    console.log('error in creating a contact', err);
                    return;
                }
            })
    } catch (error) {
        if (error) {
            res.redirect('back')
        }
    }
})

//Delete the contact
app.get('/delete-contact', (req, res) => {

    //get the id from query in the url
    let id = req.query.id;

    //find the contact in the db using id and delete
    try {
        Contact.findByIdAndDelete(id)
            .then(id => {
                return res.redirect('back');
            })
            .catch(err => {
                if (err) {
                    console.log("Error in Deleting an object from db");
                    return;
                }
            })
    } catch (error) {
        if (error) {
            res.redirect('back')
        }
    }
})

// Listen the port
app.listen(port, (err) => {
    if (err) {
        console.log("Error", err);
    }
    console.log("Express server is running on Port: ", port)
})