const axios = require('axios');

let movies = async function(request, response) {
    let searchMovie = request.query.search;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchMovie}`;
    console.log('movieURL', movieURL);
    let movieResults = await axios.get(movieURL);
    console.log('movieResults.data', movieResults.data);

    let bestMovies = movieResults.data.results.map(movie => new Movie(movie));
    bestMovies.length < 1 ? response.status(500).send('Nope. That is not found here.') : response.status(200).send(bestMovies);
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