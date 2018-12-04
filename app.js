const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Static Folder 
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port}`));