Title: myFlix
Description:
A movie app that allows users to view information about different movies, genres, and directors.
Users can also create an account, update their information, and add movies to their list of favorites.

Request	URL	HTTP Method	Request Body data format	Response Body data format
Get list of all movies	/movies	GET	None	An array of JSON objects holding information about all the movies in the database
Example record:
{
    "_id": "movie_pulpfiction000",
    "Title": "Pulp Fiction",
    "ReleaseYear": "1994",
    "Rating": "R",
    "Runtime": "2h 34m",
    "Description": "(Movie Descripsion Here).",
    "Genres": [
        "genre_crime000",
        "genre_drama000"
    ],
    "Director": [
        "director_quentintarantino000"
    ],
    "Actors": [
        "actor_johntravolta000",
        "actor_samuelljackson000",
        "actor_umathurman000"
    ],
    "ImagePath": "https://image_url.jpg",
    "Featured": true
}
Get information about a specific movie	/movies/[title]
Example: 
.../movies/Pulp%20Fiction
GET	None	A JSON object holding all data about the given movie
Example:
{
    "_id": "movie_pulpfiction000",
    "Title": "Pulp Fiction",
    "ReleaseYear": "1994",
    "Rating": "R",
    "Runtime": "2h 34m",
    "Description": "(Movie Descripsion Here).",
    "Genres": [
        "genre_crime000",
        "genre_drama000"
    ],
    "Director": [
        "director_quentintarantino000"
    ],
    "Actors": [
        "actor_johntravolta000",
        "actor_samuelljackson000",
        "actor_umathurman000"
    ],
    "ImagePath": "https://image_url.jpg",
    "Featured": true
}
Get information about a specific genre	/genre/[genre]
Example: 
.../genres/Drama
GET	None	A JSON object holding all the data about the given genre
Example:
{
    "_id": "genre_drama000",
    "name": "Drama",
    "description": "Genre Description Here."
}
Get information about a specific director	/directors/[director]
Example: 
.../directors/Steven%20Spielberg
GET	None	A JSON object holding all the data about the given director
Example:
{
    "_id": "director_stevenspielberg000",
    "name": "Steven Spielberg",
    "birthDate": "1946-12-18",
    "deathDate": null,
    "bio": "Director Bio Here.",
    "imagePath": "https://image_url.jpg"
}
Add a User	/users	POST	A JSON object holding data about the user to add
Example:
{
    "username": "jackolanternnn",  (String)
    "password": "password123!!!!",   (String)
    "email": "jack@lantern.com",   (String)
    "birthday": "1995-10-31"   (Date)
}
A JSON object holding data about the user that was added, including a new unique ID
Example:
{
    "username": "jackolanternnn",
    "password": "password123!!!!",
    "email": "jack@lantern.com",
    "birthday": "1995-10-31T00:00:00.000Z",
    "favorite_movies": [],
    "_id": "65cacb968d267bac3742a800",
    "__v": 0
}
Update Username, Password, Email, or Birthday	/users/[current username]
Example:
.../users/jackolantern    
PUT	A JSON object holding data about the user to update
Example:
{
    "username": "JackNewName",  (String)
    "password": "password123!!!!",  (String)
    "email": "jack@lantern.com",   (String)
    "birthday": "1995-10-31"   (Date)
}
A JSON object holding data about the user that was updated
Example:
{
    "_id": "65cacb968d267bac3742a800",
    "username": "JackNewName",
    "password": "password123!!!!",
    "email": "jack@lantern.com",
    "birthday": "1995-10-31T00:00:00.000Z",
    "favorite_movies": [],
    "__v": 0
}
Add a movie to a user's favorites list	/users/[username]/movies/[movie_ID]
Example:
.../users/jackolantern/movies/movie_pulpfiction000
POST	None	A JSON object showing the updated favorite_movies array
Example:
{
    "_id": "65cacb968d267bac3742a800",
    "username": "jackolantern",
    "password": "password123!!!!",
    "email": "jack@lantern.com",
    "birthday": "1995-10-31T00:00:00.000Z",
    "favorite_movies": [
        "movie_pulpfiction000"
    ],
    "__v": 0
}
Remove a movie from a user's favorites list	/users/[username]/movies/[movie_ID]
Example:
.../users/jackolantern/movies/movie_pulpfiction000    
DELETE	None	A text message indicating a movie was removed from the user's favorite list
Remove a user	/users/[username]
Example:
.../users/jackolantern
DELETE	None	A text message indicating the user was removed
Get List of All Users	/users	GET	None	An array of JSON objects holding information about all the users in the database
Example format:
{
    "_id": "65c2dd36714b2df1114d6a84",
    "first_name": "Sarah",
    "last_name": "Garcia",
    "username": "sarahgarcia",
    "password": "Password8!",
    "birthday": "1987-06-18",
    "favorite_movies": [
        "movie_savingprivateryan000",
        "movie_themagnificentseven000"
    ]
}
Get Data for a Single User	/users/[username]
.../users/jackolantern
GET	None	A JSON object holding information about the user
Example:
{
    "_id": "65cadb7dd1468d0e5725c735",
    "username": "jackolantern",
    "password": "password123!!!!",
    "email": "jack@lantern.com",
    "birthday": "1995-10-31T00:00:00.000Z",
    "favorite_movies": [],
    "__v": 0
}
