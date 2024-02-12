const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

// Imports or "requires" the Mongoose package, and the models we defined in the models.js file
const mongoose = require('mongoose');
const Models = require('./models.js');

// so the variables 'Movies' and 'User' will point to the MODEL NAMES we defined in models.js
const Movies = Models.Movie;
const Users = Models.User;

// connect the Mongoose to the entire database, so it can perform CRUD operations
// According to Mongoose documentation, if the connection fails on your machine, try replacing “localhost” with “127.0.0.1”
mongoose.connect('mongodb://localhost:27017/myFlix', { useNewUrlParser: true, useUnifiedTopology: true });

let users = [
    {
        id: 1,
        name: "Kim",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Joe",
        favoriteMovies: ["The Godfather"]
    },
];

let movies = [
    {
        "Title":"The Godfather",
        "Description":"Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
        "Genre": {
            "Name":"Drama",
            "Description":"The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences.",
        },
        "Director":{
            "Name":"Francis Ford Coppola",
            "Bio":"Francis Ford Coppola (born April 7, 1939, Detroit, Michigan, U.S.) is an American motion-picture director, writer, and producer whose films range from sweeping epics to small-scale character studies. As the director of films such as The Godfather (1972), The Conversation (1974), and Apocalypse Now (1979), he enjoyed his greatest success and influence in the 1970s, when he attempted to create an alternative to the Hollywood system of film production and distribution.",
            "Birth":"1939.04.07",
        },
        "imageURL":"https://posters.movieposterdb.com/22_07/1972/68646/l_68646_8c811dec.jpg",
        "Featured":false
    },
    {
        "Title":"The Shawshank Redemption",
        "Description":"Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
        "Genre": {
            "Name":"Drama",
            "Description":"The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences.",
        },
        "Director":{
            "Name":"Frank Darabont",
            "Bio":"Frank Árpád Darabont (born Ferenc Árpád Darabont, January 28, 1959) is an American screenwriter, director and producer. He has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for such horror films as A Nightmare on Elm Street 3: Dream Warriors (1987), The Blob (1988) and The Fly II (1989). As a director, he is known for his film adaptations of Stephen King novellas and novels, such as The Shawshank Redemption (1994), The Green Mile (1999), and The Mist (2007).",
            "Birth":"1959.01.28",
        },
        "imageURL":"https://posters.movieposterdb.com/05_03/1994/0111161/l_8494_0111161_3bb8e662.jpg",
        "Featured":false
    },
    {
        "Title":"Schindler's List",
        "Description":"In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        "Genre": {
            "Name":"Drama",
            "Description":"The drama genre is defined by conflict and often looks to reality rather than sensationalism. Emotions and intense situations are the focus, but where other genres might use unique or exciting moments to create a feeling, movies in the drama genre focus on common occurrences.",
        },
        "Director":{
            "Name":"Steven Spielberg",
            "Bio":"Steven Allan Spielberg (born December 18, 1946) is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history.[1] He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, and four Directors Guild of America Awards, as well as the AFI Life Achievement Award in 1995, the Kennedy Center Honor in 2006, the Cecil B. DeMille Award in 2009 and the Presidential Medal of Freedom in 2015. Seven of his films have been inducted into the National Film Registry by the Library of Congress as \"culturally, historically or aesthetically significant\".",
            "Birth":"1946.12.18",
        },
        "imageURL":"https://posters.movieposterdb.com/08_02/1993/108052/l_108052_6ad6d11e.jpg",
        "Featured":false
    },
    {
        "Title":"Casablanca",
        "Description":"A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
        "Genre": {
            "Name":"Romance",
            "Description":"The romance genre is defined by intimate relationships. Sometimes these movies can have a darker twist, but the idea is to lean on the natural conflict derived from the pursuit of intimacy and love.",
        },
        "Director":{
            "Name":"Michael Curtiz",
            "Bio":"Michael Curtiz (born Manó Kaminer; from 1905 Mihály Kertész; Hungarian: Kertész Mihály; December 24, 1886 – April 10, 1962) was a Hungarian-American film director, recognized as one of the most prolific directors in history.[2]: 67  He directed classic films from the silent era and numerous others during Hollywood's Golden Age, when the studio system was prevalent.",
            "Birth":"1886.12.24",
        },
        "imageURL":"https://posters.movieposterdb.com/21_04/1983/84994/l_84994_39b61adf.jpg",
        "Featured":false
    },
    {
        "Title":"The Wizard of Oz",
        "Description":"Young Dorothy Gale and her dog Toto are swept away by a tornado from their Kansas farm to the magical Land of Oz, and embark on a quest with three new friends to see the Wizard, who can return her to her home and fulfill the others' wishes.",
        "Genre": {
            "Name":"Fantasy",
            "Description":"The fantasy genre is defined by both circumstance and setting inside a fictional universe with an unrealistic set of natural laws. The possibilities of fantasy are nearly endless, but the movies will often be inspired by or incorporate human myths.",
        },
        "Director":{
            "Name":"Victor Fleming",
            "Bio":"Victor Lonzo Fleming (February 23, 1889 – January 6, 1949) was an American film director, cinematographer, and producer. His most popular films were Gone with the Wind, for which he won an Academy Award for Best Director, and The Wizard of Oz (both 1939). Fleming has those same two films listed in the top 10 of the American Film Institute's 2007 AFI's 100 Years...100 Movies list.",
            "Birth":"1889.02.23",
        },
        "imageURL":"https://posters.movieposterdb.com/22_12/2007/1050269/l_a-tribute-to-the-wizard-of-oz-movie-poster_7262c2d3.jpg",
        "Featured":false
    },
    {
        "Title":"West Side Story",
        "Description":"Two youngsters from rival New York City gangs fall in love, but tensions between their respective friends build toward tragedy.",
        "Genre": {
            "Name":"Musical",
            "Description":"Musicals originated as stage plays, but they soon became a favorite for many film directors and have even made their way into television. Musicals can incorporate any other genre, but they incorporate characters who sing songs and perform dance numbers.",
        },
        "Director":{
            "Name":"Jerome Robbins",
            "Bio":"Jerome Robbins (born Jerome Wilson Rabinowitz; October 11, 1918 – July 29, 1998) was an American dancer, choreographer, film director, theatre director and producer who worked in classical ballet, on stage, film, and television. Among his numerous stage productions were On the Town, Peter Pan, High Button Shoes, The King and I, The Pajama Game, Bells Are Ringing, West Side Story, Gypsy, and Fiddler on the Roof. Robbins was a five-time Tony Award-winner and a recipient of the Kennedy Center Honors. He received two Academy Awards, including the 1961 Academy Award for Best Director with Robert Wise for West Side Story and a special Academy Honorary Award for his choreographic achievements on film.",
            "Birth":"1918.10.11",
        },
        "imageURL":"https://posters.movieposterdb.com/13_03/1961/55614/l_55614_fdca5bad.jpg",
        "Featured":false
    },
    {
        "Title":"2001: A Space Odyssey",
        "Description":"After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins: a spacecraft manned by two men and the supercomputer HAL 9000.",
        "Genre": {
            "Name":"Science Fiction",
            "Description":"Science fiction movies are defined by a mixture of speculation and science. While fantasy will explain through or make use of magic and mysticism, science fiction will use the changes and trajectory of technology and science. Science fiction will often incorporate space, biology, energy, time, and any other observable science.",
        },
        "Director":{
            "Name":"Stanley Kubrick",
            "Bio":"Stanley Kubrick (July 26, 1928 – March 7, 1999) was an American filmmaker and photographer. Widely considered one of the greatest filmmakers of all time, his films were nearly all adaptations of novels or short stories, spanning a number of genres and gaining recognition for their intense attention to detail, innovative cinematography, extensive set design, and dark humor.",
            "Birth":"1928.07.26",
        },
        "imageURL":"https://posters.movieposterdb.com/05_10/1968/0062622/l_62477_0062622_b9318a18.jpg",
        "Featured":false
    },
    {
        "Title":"Apocalypse Now",
        "Description":"A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.",
        "Genre": {
            "Name":"War",
            "Description":"The war genre has a few debatable definitions, but we’re going to try to be as straightforward and impartial as humanly possible. Movies in the war genre center around large scale conflicts between opposing forces inside a universe that shares the same natural laws as our own. War movies can be historical accounts, fictionalized events, or future speculations that incorporate civilian interaction, political interaction, and espionage that takes place alongside a large scale, violent conflict.",
        },
        "Director":{
            "Name":"Francis Ford Coppola",
            "Bio":"Francis Ford Coppola (born April 7, 1939, Detroit, Michigan, U.S.) is an American motion-picture director, writer, and producer whose films range from sweeping epics to small-scale character studies. As the director of films such as The Godfather (1972), The Conversation (1974), and Apocalypse Now (1979), he enjoyed his greatest success and influence in the 1970s, when he attempted to create an alternative to the Hollywood system of film production and distribution.",
            "Birth":"1939.04.07",
        },
        "imageURL":"https://posters.movieposterdb.com/08_05/1979/78788/l_78788_600da6a4.jpg",
        "Featured":false
    },
    {
        "Title":"Raiders of the Lost Ark",
        "Description":"In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis can obtain its awesome powers.",
        "Genre": {
            "Name":"Action",
            "Description":"Movies in the action genre are defined by risk and stakes. While many movies may feature an action sequence, to be appropriately categorized inside the action genre, the bulk of the content must be action-oriented, including fight scenes, stunts, car chases, and general danger.",
        },
        "Director":{
            "Name":"Steven Spielberg",
            "Bio":"Steven Allan Spielberg (born December 18, 1946) is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history.[1] He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, and four Directors Guild of America Awards, as well as the AFI Life Achievement Award in 1995, the Kennedy Center Honor in 2006, the Cecil B. DeMille Award in 2009 and the Presidential Medal of Freedom in 2015. Seven of his films have been inducted into the National Film Registry by the Library of Congress as \"culturally, historically or aesthetically significant\".",
            "Birth":"1946.12.18",
        },
        "imageURL":"https://posters.movieposterdb.com/20_08/1981/82971/l_82971_a5e3e742.jpg",
        "Featured":false
    },
    {
        "Title":"Breakfast at Tiffany's",
        "Description":"A young New York socialite becomes interested in a young man who has moved into her apartment building, but her past threatens to get in the way.",
        "Genre": {
            "Name":"Romance",
            "Description":"The romance genre is defined by intimate relationships. Sometimes these movies can have a darker twist, but the idea is to lean on the natural conflict derived from the pursuit of intimacy and love.",
        },
        "Director":{
            "Name":"Blake Edwards",
            "Bio":"Blake Edwards (born William Blake Crump; July 26, 1922 – December 15, 2010) was an American film director, producer, screenwriter, and actor. Edwards began his career in the 1940s as an actor, but he soon began writing screenplays and radio scripts before turning to producing and directing in television and films. His best-known films include Breakfast at Tiffany's (1961), Days of Wine and Roses (1962), A Shot in the Dark (1964), The Great Race (1965), 10 (1979), Victor/Victoria (1982), Blind Date (1987), and the hugely successful Pink Panther film series with British actor Peter Sellers. Often thought of as primarily a director of comedies, he also directed several drama, musical, and detective films. Late in his career, he took up writing, producing and directing for theater.",
            "Birth":"1922.07.26",
        },
        "imageURL":"https://posters.movieposterdb.com/22_12/2006/1039597/l_breakfast-at-tiffanys-the-making-of-a-classic-movie-poster_c8528179.jpg",
        "Featured":false
    },

];

// Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie =>  movie.Title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('Movie not found');
    }
});

// Return data about a genre (description) by name/title (of genre?)
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie =>  movie.Genre.Name === genreName ).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('Genre not found');
    }
});

// Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie =>  movie.Director.Name === directorName ).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('Director not found');
    }
});

// Allow new users to register
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (!newUser.name) {
        const message = 'Missing name in request body';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser.name + " has been added to the database.");
    }
});

// Allow users to update their user info (username)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).send("User " + id + " username has been updated to " + user.name + "."); 
    } else {
        res.status(400).send('User not found');
    }
});

// Allow users to add a movie to their list of favorites, showing only a text that a movie has been added
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(movieTitle + " has been added to " + id + "\'s array.");
    } else {
        res.status(400).send('User not found');
    }
});

// Allow users to remove a movie from their list of favorites, showing only a text that a movie has been removed
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle );
        res.status(200).send(movieTitle + " has been removed from user " + id + "\'s array.");
    } else {
        res.status(400).send('User not found');
    }
});

// Allow existing users to deregister, showing only a text that a user email has been removed
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id );
        res.status(200).send("User " + id + " has been removed from the database.");
    } else {
        res.status(400).send('User not found');
    }
});

// List all users
app.get('/users', (req, res) => {
    res.status(200).json(users);
});

// Start server on 8080
app.listen(8080, () => console.log('listening on 8080'));