const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({extended: true}));

// Static Folder 
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
    const {firstname, lastName, email} = req.body;

    // Make Sure fields are filled
    if (!firstname || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }
});



const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port}`));