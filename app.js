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
    const {firstName, lastName, email} = req.body;
    // Make Sure fields are filled
    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    } 

     // Construct req Data
     const data = {
         members: [
             {
                 email_address: email,
                 status: 'subscribed',
                 merge_fields: {
                     FNAME: firstName,
                     LNAME: lastName
                 }
             }
         ]
     }

     const postData = JSON.stringify(data);

    const options = {
        url: 'https://us19.api.mailchimp.com/3.0/lists/84f152a1c6',
        method: 'POST',
        headers: {
            Authorization: 'auth c354a3933661d7fef7fb0c9bcd121f50-us19'
        },
        body: postData 
    }

    request(options, (err, response, body) => {
        if(err){
            res.redirect('/fail.html');
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success.html')
            } else {
                res.redirect('/fail.html');
            }
        }
    });
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port}`));