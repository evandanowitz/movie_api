# RESTful API - myFlix Movie Application

## Overview
The myFlix API is a server-side component of the "myFlix" movie web application, built using Node.js, Express, and MongoDB. This API provides users with access to database information about various movies, directors, and genres. It also allows users to sign up, update personal details, and manage their list of favorite movies.

This project is part of a larger full-stack JavaScript application that will be integrated with a React-based client-side interface as well as a separate Angular-based client-side interface as well.

## Features
- **_View all movies_**: Retrieve a list of all movies.
- **_Search for individual movies_**: Retrieve details about a single movie by title (description, genre, director, image, etc.).
- **_View genre information_**: Retrieve details about a genre by name (e.g., "Thriller").
- **_View director information_**: Retrieve information about a director (bio, birth year, death year).
- **_Create account_**: Allow new users to register and create an account.
- **_Update user information_**: Allow users to update their profile information (username, password, email, and date of birth).
- **_Add movies to favorites_**: Allow users to add movies to their list of favorites.
- **_Remove movies from favorites_**: Allow users to remove movies from their list of favorites.
- **_Delete account_**: Allow users to deregister.

## Tech Stack
- _Node.js_: Server-side runtime environment
- _Express_: Web server framework for handling HTTP requests
- _MongoDB_: Non-relational database for storing movie, director, genre, and user data
- _Mongoose_: Object data modeling library used to interact with MongoDB
- _Heroku_: Deployment platform for hosting the API

## Project Structure
- _package.json_: Project dependencies and scripts.
- _models/_: Mongoose models for the API (e.g., movies, users).
- _routes/_: Express routes that define the API endpoints.
- _auth/_: Authentication and authorization middleware using JWT.
- _middlewares/_: Custom middlewares for error handling, data validation, and security.
- _config/_: Configuration files for database connections and other settings.

## API Endpoints
### Movies
- GET `/movies`: Returns a list of all movies.
- GET `/movies/:title`: Returns details about a single movie by title.
- GET `/genres/:name`: Returns details about a genre by name.
- GET `/directors/:name`: Returns details about a director by name.
### Users
- POST `/users`: Register a new user.
- PUT `/users/:username`: Update user information.
- POST `/users/:username/movies/:movieID`: Add a movie to the user's favorites.
- DELETE `/users/:username/movies/:movieID`: Remove a movie from the user's favorites.
- DELETE `/users/:username`: Deregister the user.

## Authentication & Authorization
- **JWT** (JSON Web Token): The API uses token-based authentication for protected routes.
- User authentication is required for managing user profiles and favorite movies.

## Data Security & Validation
- All user input is validated to ensure proper formatting and security.
- Passwords are hashed for secure storage.
- CORS (Cross-Origin Resource Sharing) is implemented to allow controlled access from external client applications.

## Installation
### Clone the repository:
Run the following command: `git clone https://github.com/yourusername/movie-api.git`
- Ensure that you replace '_yourusername_' with your actual GitHub username and repository name.
Navigate to the project directory:
- Run the following command: `cd movie-api`
### Install dependencies:
If you are using `npm` (Node Package Manager) to manage your packages, run the following command: `npm install`
- This will install all required packages and dependencies listed in the package.json file.
### Set up environment variables for MongoDB connection and JWT secret:
Create a .env file in the root directory with the following keys:
- `MONGO_URI=your-mongodb-connection-string`
- `JWT_SECRET=your-secret-key`
### Start the server:
To start the server, run one of the following commands: `node index.js` or `npm start`
### Use **Postman**, a browser, or any other API testing tool to interact with the API at:
`http://localhost:8080/`

## Testing
The API endpoints were tested using Postman. You can test endpoints from the `index.js` file in Postman as well. For a refresher or a guide on how to successfully test with Postman, take a look at the following resources or have a look at Postman's official documentation:
- [API Testing](https://www.postman.com/api-platform/api-testing/)
- [Test your API using test collections and CI tools](https://learning.postman.com/docs/designing-and-developing-your-api/testing-an-api/)

## Deployment
The API is deployed on Heroku and the code can be viewed in this repository.
The Documentation for the Movie RESTful API can be accessed at by clicking [here](https://myflix-db-movie-app-af5513e7733f.herokuapp.com/).

## Future Enhancements
- Add functionality to track actors and movies they star in.
- Implement a "To Watch" list feature.
- Add movie ratings and reviews functionality.
