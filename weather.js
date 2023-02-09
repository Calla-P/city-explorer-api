const axios = require('axios');

let cache = {
    cachedWeather: null,
    weatherTimestamp: null,
    searchedCoordinates: {
        lat: null,
        lon: null
    }
};

let weather = async function(request, response) {
    //varibles for the cache
    let testTimedCache = 1000 * 20;
    let currentTime = Date.now();
    // varibles for the querry
    let lat = request.query.lat;
    let lon = request.query.lon;

    // is cache present & recent, return cache, else run new API call
    if(cache && currentTime - cache.weatherTimestamp < testTimedCache && cache.searchedCoordinates[lat] === lat && cache.searchedCoordinates[lon] === lon){
        console.log('Stored data in cache');
        response.status(200).send(cache.cachedWeather);
    } else {
    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=10&key=${process.env.WEATHER_API_KEY}`;

    let searchQuery = await axios.get(weatherURL);
    console.log(searchQuery);

    let threeDayForecast = searchQuery.data.data.map
    (day => new Forecast(day));

    console.log(threeDayForecast);

    threeDayForecast.length < 1 ? response.status(500).send('Error. City not covered by system.') : response.status(200).send(threeDayForecast);
    cache.cachedWeather = threeDayForecast;
    cache.weatherTimestamp = Date.now();
    cache.searchedCoordinates[lat] = lat;
    cache.searchedCoordinates[lon] = lon;

};
};

class Forecast {
        constructor(weatherObj){
            console.log('weatherObj:', weatherObj);
            this.date = weatherObj.datetime;
            this.description = weatherObj.weather.description.toLowerCase();
            this.low = weatherObj.low_temp
            this.high = weatherObj.max_temp;
            this.wholeDescription = `Today is a high of ${weatherObj.high_temp}, low of ${weatherObj.low_temp}, with probably ${this.description}.`;
        };
    };

    module.exports = weather;