'use strict'

console.log('My first server');

// What is Required
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
let weather = require('./weather');
let movie = require('./movie');

// What  is Used
const app = express();
app.use(cors());
const PORT=process.env.PORT || 3002;


// The Routes we take
app.get('/weather',weather);
app.get('/movie',movie);

// app.get similar to axios.get

app.get('/',(request,response)=>{
    response.send('Hello, from my  first server');
});

// for the routes that are undefined 
app.get('*', (request,response) => {
    response.send('Exist this route does not');
});

// The classes 

// for listening
app.listen(PORT, () => console.log(`You are listening to port ${PORT}`));



