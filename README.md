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

<br><br><br><br>
## Example Records

### Get list of all movies
**Request:**  
`GET .../movies`

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

... list continues ...
```
<br><br>

### Get information about a specific movie
**Request:**  
`GET .../movies/Pulp%20Fiction`

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
<br><br>

### Get information about a specific genre
**Request:**  
`GET .../genres/Drama`

**Response:**
```json
{
    "_id": "genre_drama000",
    "name": "Drama",
    "description": "Genre Description Here."
}
```
<br><br>

### Get information about a specific director
**Request:**
`GET .../directors/Steven%20Spielberg`

**Response:**
```json
{
    "_id": "director_stevenspielberg000",
    "name": "Steven Spielberg",
    "birthDate": "1946-12-18",
    "deathDate": null,
    "bio": "Director Bio Here.",
    "imagePath": "https://image_url.jpg"
}
```
<br><br>

### Add a User
**Request:**
POST .../users

**Payload:**
```json
{
    "username": "jackolanternnn",  (String)
    "password": "password123!!!!",   (String)
    "email": "jack@lantern.com",   (String)
    "birthday": "1995-10-31"   (Date)
}
```

**Response:**
```
{
    "username": "jackolanternnn",
    "password": "password123!!!!",
    "email": "jack@lantern.com",
    "birthday": "1995-10-31T00:00:00.000Z",
    "favorite_movies": [],
    "_id": "65cacb968d267bac3742a800",
    "__v": 0
}
```
<br><br>

### Update Username, Password, Email, or Birthday

**Request:**
PUT .../users/jackolantern 

**Payload:**
```json
{
    "username": "JackNewName",  (String)
    "password": "password123!!!!",  (String)
    "email": "jack@lantern.com",   (String)
    "birthday": "1995-10-31"   (Date)
}
```

**Response:**
```json
{
    "_id": "65cacb968d267bac3742a800",
    "username": "JackNewName",
    "password": "password123!!!!",
    "email": "jack@lantern.com",
    "birthday": "1995-10-31T00:00:00.000Z",
    "favorite_movies": [],
    "__v": 0
}
```
<br><br>

### Add a movie to a user's favorites list
**Request:**
POST .../users/jackolantern/movies/movie_pulpfiction000

**Response:**
```json
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
```
<br><br>

### Remove a movie from a user's favorites list
**Request:**
DELETE .../users/jackolantern/movies/movie_pulpfiction000    

**Response:**
"Pulp Fiction was removed from the user's favorite list!"
<br><br>


### Remove a user
**Request:**
DELETE .../users/jackolantern

**Response:**
"jackolantern was removed from the user database!"
<br><br>


### Get List of All Users
**Request:**
GET .../users

**Response:**
```json
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

... list continues ... 
```
<br><br>

### Get Data for a Single User

**Request:**
GET .../users/jackolantern

**Response:**
```
{
    "_id": "65cadb7dd1468d0e5725c735",
    "username": "jackolantern",
    "password": "password123!!!!",
    "email": "jack@lantern.com",
    "birthday": "1995-10-31T00:00:00.000Z",
    "favorite_movies": [],
    "__v": 0
}
```
<br><br>
