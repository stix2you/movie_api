
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    

</head>

<body>
    <h1>Title: myFlix<br></h1>
    <h2>
        Description:
    </h2>
    <h3>A movie app that allows users to view information about different movies, genres, and directors.<br>Users can
        also create an account, update their information, and add movies to their list of favorites.<br><br>
    </h3>
    <table>
        <tr>
            <th>Request</th>
            <th>URL</th>
            <th>HTTP Method</th>
            <th>Request Body data format</th>
            <th>Response Body data format</th>
        </tr>
        <tr>
            <td>Get list of all movies</td>
            <td>/movies</td>
            <td>GET</td>
            <td>None</td>
            <td>An array of JSON objects holding information about all the movies in the database
<pre>
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
</pre>                
            </td>
        </tr>
        <tr>
            <td>Get information about a specific movie</td>
            <td>/movies/[title]
<pre>
Example: 
.../movies/Pulp%20Fiction
</pre>
            </td>
            <td>GET</td>
            <td>None</td>
            <td>A JSON object holding all data about the given movie
<pre>
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
</pre>
            </td>
        </tr>
        <tr>
            <td>Get information about a specific genre</td>
            <td>/genre/[genre]
<pre>
Example: 
.../genres/Drama
</pre>                
            </td>
            <td>GET</td>
            <td>None</td>
            <td>A JSON object holding all the data about the given genre
<pre>
Example:
{
    "_id": "genre_drama000",
    "name": "Drama",
    "description": "Genre Description Here."
}
</pre>
            </td>
        </tr>
        <tr>
            <td>Get information about a specific director
            </td>
            <td>/directors/[director]
<pre>
Example: 
.../directors/Steven%20Spielberg
</pre>                
            </td>
            <td>GET</td>
            <td>None</td>
            <td>A JSON object holding all the data about the given director
<pre>
Example:
{
    "_id": "director_stevenspielberg000",
    "name": "Steven Spielberg",
    "birthDate": "1946-12-18",
    "deathDate": null,
    "bio": "Director Bio Here.",
    "imagePath": "https://image_url.jpg"
}
</pre>
            </td>
        </tr>
        <tr>
            <td>Add a User</td>
            <td>/users</td>
            <td>POST</td>
            <td>A JSON object holding data about the user to add
<pre>
Example:
{
    "username": "jackolanternnn",  (String)
    "password": "password123!!!!",   (String)
    "email": "jack@lantern.com",   (String)
    "birthday": "1995-10-31"   (Date)
}
</pre>
            </td>
            <td>A JSON object holding data about the user that was added, including a new unique ID
<pre>
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
</pre>
            </td>
        </tr>
        <tr>
            <td>Update Username, Password, Email, or Birthday</td>
            <td>/users/[current username]
<pre>
Example:
.../users/jackolantern    
</pre>
            </td>
            <td>PUT</td>
            <td>A JSON object holding data about the user to update
<pre>
Example:
{
    "username": "JackNewName",  (String)
    "password": "password123!!!!",  (String)
    "email": "jack@lantern.com",   (String)
    "birthday": "1995-10-31"   (Date)
}
</pre>
        </td>
        <td>A JSON object holding data about the user that was updated
<pre>
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
</pre>
        </td>
        </tr>
        <tr>
            <td>Add a movie to a user's favorites list</td>
            <td>/users/[username]/movies/[movie_ID]
<pre>
Example:
.../users/jackolantern/movies/movie_pulpfiction000
</pre>
            </td>
            <td>POST</td>
            <td>None</td>
            <td>A JSON object showing the updated favorite_movies array
<pre>
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
</pre>
            </td>
        </tr>
        <tr>
            <td>Remove a movie from a user's favorites list</td>
            <td>/users/[username]/movies/[movie_ID]
<pre>
Example:
.../users/jackolantern/movies/movie_pulpfiction000    
</pre>
            </td>
            <td>DELETE</td>
            <td>None</td>
            <td>A text message indicating a movie was removed from the user's favorite list</td>
        </tr>
        <tr>
            <td>Remove a user</td>
            <td>/users/[username]
<pre>
Example:
.../users/jackolantern
</pre>
            </td>
            <td>DELETE</td>
            <td>None</td>
            <td>A text message indicating the user was removed</td>
        </tr>
        <tr>
            <td>Get List of All Users</td>
            <td>/users</td>
            <td>GET</td>
            <td>None</td>
            <td>An array of JSON objects holding information about all the users in the database
<pre>
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
</pre>
            </td>
        </tr>
        <tr>
            <td>Get Data for a Single User</td>
            <td>/users/[username]
<pre>
.../users/jackolantern
</pre>
            </td>
            <td>GET</td>
            <td>None</td>
            <td>A JSON object holding information about the user
<pre>
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
</pre>
            </td>
        </tr>
    </table>
</body>

</html>
