// import express and morgan
const express = require('express'),
    morgan = require('morgan'),
    app = express();

// array of top 10 movies
let topMovies = [
    {
        title: 'The Shawshank Redemption',
        year: '1994',
        rated: 'R',
        genre: 'Drama',
        director: 'Frank Darabont',
        stars: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler'
    },
    {
        title: 'The Godfather',
        year: '1972',
        rated: 'R',
        genre: 'Crime, Drama',
        director: 'Francis Ford Coppola',
        stars: 'Marlon Brando, Al Pacino, James Caan, Diane Keaton'
    },
    {
        title: 'The Dark Knight',
        year: '2008',
        rated: 'PG-13',
        genre: 'Action, Crime, Drama',
        director: 'Christopher Nolan',
        stars: 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine'
    },
    {
        title: 'The Godfather Part II',
        year: '1974',
        rated: 'R',
        genre: 'Crime, Drama',
        director: 'Francis Ford Coppola',
        stars: 'Al Pacino, Robert De Niro, Robert Duvall, Diane Keaton'
    },
    {
        title: '12 Angry Men',
        year: '1957',
        rated: 'Approved',
        genre: 'Crime, Drama',
        director: 'Sidney Lumet',
        stars: 'Henry Fonda, Lee J. Cobb, Martin Balsam, John Fiedler'
    },
    {
        title: 'Schindler\'s List',
        year: '1993',
        rated: 'R',
        genre: 'Biography, Drama, History',
        director: 'Steven Spielberg',
        stars: 'Liam Neeson, Ralph Fiennes, Ben Kingsley, Caroline Goodall'
    },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: '2003',
        rated: 'PG-13',
        genre: 'Action, Adventure, Drama',
        director: 'Peter Jackson',
        stars: 'Elijah Wood, Viggo Mortensen, Ian McKellen, Orlando Bloom'
    },
    {
        title: 'Pulp Fiction',
        year: '1994',
        rated: 'R',
        genre: 'Crime, Drama',
        director: 'Quentin Tarantino',
        stars: 'John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: '2001',
        rated: 'PG-13',
        genre: 'Action, Adventure, Drama',
        director: 'Peter Jackson',
        stars: 'Elijah Wood, Ian McKellen, Orlando Bloom, Sean Bean'
    },
    {
        title: 'The Good, the Bad, and the Ugly',
        year: '1966',
        rated: 'Approved',
        genre: 'Adventure, Western',
        director: 'Serigo Leone',
        stars: 'Clint Eastwood, Eli Wallach, Lee Van Cleef, Aldo Giuffrè'
    }
];

// logging: send to terminal using morgan common format
app.use(morgan('common'));

// set static folder to public
app.use(express.static('public'));

// 'get' requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix Movie App!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// error handling for 404
app.use((req, res) => {
    res.status(404).send("Sorry, the resource you're looking for doesn't exist.");
});

// error handling for 500
app.use((req, res) => {
    res.status(500).send('Something broke!');
});

// start the server
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});