# myFlix App Documentation

## Description
A movie app that allows users to view information about different movies, genres, and directors. Users can also create an account, update their information, and add movies to their list of favorites.

## API URL
[https://stix2you-myflix-5cbcd3c20372.herokuapp.com](https://stix2you-myflix-5cbcd3c20372.herokuapp.com)

## API Endpoints

| Request                                    | URL                                 | HTTP Method | Request Body Data Format | Response Body Data Format                         |
|--------------------------------------------|-------------------------------------|-------------|--------------------------|---------------------------------------------------|
| Get list of all movies                     | `/movies`                           | GET         | None                     | An array of JSON objects holding movie information |
| Get information about a specific movie     | `/movies/[title]`                   | GET         | None                     | A JSON object holding data about the movie        |
| Get information about a specific genre     | `/genres/[genre]`                   | GET         | None                     | A JSON object holding data about the genre        |
| Get information about a specific director  | `/directors/[director]`             | GET         | None                     | A JSON object holding data about the director     |
| Add a user                                 | `/users`                            | POST        | A JSON object holding user data                   | A JSON object holding data about the added user   |
| Update user details                        | `/users/[current username]`         | PUT         | A JSON object holding updated user data           | A JSON object holding data about the updated user |
| Add a movie to a user's favorites list     | `/users/[username]/movies/[movie_ID]`| POST       | None                     | A JSON object showing updated favorite_movies     |
| Remove a movie from a user's favorites list| `/users/[username]/movies/[movie_ID]`| DELETE     | None                     | A message indicating the movie was removed        |
| Remove a user                              | `/users/[username]`                 | DELETE      | None                     | A message indicating the user was removed         |
| Get list of all users                      | `/users`                            | GET         | None                     | An array of JSON objects holding user information |
| Get data for a single user                 | `/users/[username]`                 | GET         | None                     | A JSON object holding user information            |

## Example Records

### Get list of all movies
**Request:**  
`GET /movies`

**Response:**
```json
[
  {
    "_id": "movie_pulpfiction000",
    "Title": "Pulp Fiction",
    "ReleaseYear": "1994",
    "Rating": "R",
    "Runtime": "2h 34m",
    "Description": "(Movie Description Here).",
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
]
```

### Get information about a specific movie
**Request:**  
`GET /movies`

**Response:**
```json
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
```
### Get information about a specific genre

**Request:**  
`GET /movies`

**Response:**
```json

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
