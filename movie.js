const axios = require('axios');
let cache = {
    cachedMovie: null,
    timedMovieStamp: null,
    searchedValue:null
};

let movies = async function(request, response) {
    //varibles for cache
    let testTimedCache = 1000 * 60 * 60 * 24 * 7 * 4; //one month
    let currentTime = Date.now();

    //varibles for query
    let searchMovie = request.query.search;
    if(cache && currentTime - cache.timedMovieStamp < testTimedCache && cache.searchedValue === searchMovie) {
        console.log('Stored cache data');
        response.status(200).send(cache.cachedMovie);
    } else {
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchMovie}`;
    console.log('movieURL', movieURL);

    let movieResults = await axios.get(movieURL);
    console.log('movieResults.data', movieResults.data);

    let bestMovies = movieResults.data.results.map(movie => new Movie(movie));
    bestMovies.length < 1 ? response.status(500).send('Nope. That is not found here.') : response.status(200).send(bestMovies);
    cache.cachedMovie = bestMovies;
    cache.timedMovieStamp = Date.now();
    cache.searchedValue = searchMovie;
 };
};

class Movie {
    constructor(movieObj) {
        this.title = movieObj.title;
        this.overview = movieObj.overview;
        this.averageRating = movieObj.vote_average;
        this.totalReviews = movieObj.vote_count;
        this.imgPath = movieObj.poster_path ? `https://image.tmdb.org/t/p/original/${movieObj.poster_path}` : '';
        this.releaseDate = movieObj.release_date;

        console.log(movieObj);
    };
    
};

module.exports = movies;