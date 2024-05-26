# myFlix API

## Description

myFlix is a movie app that allows users to view information about different movies, genres, and directors. Users can also create an account, update their information, and add movies to their list of favorites.

## Documentation

For detailed API documentation, please refer to the [API Documentation](public/documentation.html).

## API Endpoints Overview

### Movies
- **Get list of all movies:** `GET /movies`
- **Get information about a specific movie:** `GET /movies/[title]`

### Genres
- **Get information about a specific genre:** `GET /genres/[genre]`

### Directors
- **Get information about a specific director:** `GET /directors/[director]`

### Users
- **Add a user:** `POST /users`
- **Update user information:** `PUT /users/[username]`
- **Add a movie to a user's favorites list:** `POST /users/[username]/movies/[movie_ID]`
- **Remove a movie from a user's favorites list:** `DELETE /users/[username]/movies/[movie_ID]`
- **Remove a user:** `DELETE /users/[username]`
- **Get list of all users:** `GET /users`
- **Get data for a single user:** `GET /users/[username]`

For more details on request and response formats, please check the [API Documentation](public/documentation.html).
