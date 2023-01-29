'use strict'

console.log('My first server');

// What is Required
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const axios = require('axios');
let weather = require('./data/weather.json');

// What  is Used
const app = express();
app.use(cors());
const PORT=process.env.PORT || 3002;


// The Routes we take
// app.get('weather',weather);
// app.get similar to axios.get

app.get('/',(request,response)=>{
    response.send('Hello, from my  first server');
});

app.get('/weather', (request, response) => {
    // let lat = request.query.lat;
    // let lon = request.query.lon;
    // let searchQuery = weatherData.filter(city => (city.lat === lat && city.lon === lon));
    let cityName = request.query.searchQuery;
    let city = weather.find(city => city.city_name === cityName)
    let threeDayForecast = city.data.map(day=> new Forecast(day));
    threeDayForecast.length < 1 ? response.status(500).send('Error. City not covered by system.') : response.status(200).send(threeDayForecast);
  });

// for the routes that are undefined 
app.get('*', (request,response) => {
    response.send('Exist this route does not');
});

// The classes 

class Forecast{
constructor(weatherObj){
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description.toLowerCase();
};
}


// for listening
app.listen(PORT, () => console.log(`You are listening to port ${PORT}`));



// class Forecast {
    //     constructor(weatherObj){
    //         console.log('weatherObj:', weatherObj);
    //         this.date = weatherObj.datetime;
    //         this.description = weatherObj.weather.description.toLowerCase();
    //         this.low = weatherObj.low_temp
    //         this.high = weatherObj.high_temp;
    //         this.wholeDescription = 'Today is a high of ${this.high}, low of ${this.low}, with probably ${this.description}.';
    //     };
    // };