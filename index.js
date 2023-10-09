const express = require('express'), // Import Express framework
morgan = require('morgan'), // Import Morgan logging middleware
fs = require('fs'), // Import Node.js file system module
path = require('path'); // Import Node.js path module
const app = express(); // Create variable (app) to hold Express framework functionality

// Define array of objects containing movie data
let topMovies = [
    {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    year: '1994'
    },
    {
    title: 'The Godfather',
    author: 'Francis Ford Coppola',
    year: '1972'
    },
    {
    title: 'The Dark Knight',
    author: 'Christopher Nolan',
    year: '2008'
    },
    {
    title:'The Godfather: Part II',
    author: 'Francis Ford Coppola',
    year: '1974'
    },
    {
    title: '12 Angry Men',
    author: 'Sidney Lumet',
    year: '1957'
    },
    {
    title: 'Schindler\'s List',
    author: 'Steven Spielberg',
    year: '1993'
    },
    {
    title: 'The Lord of the Rings: The Return of the King',
    author: 'Peter Jackson',
    year: '2003'
    },
    {
    title: 'Pulp Fiction',
    author: 'Quentin Tarantino',
    year: '1994'
    },
    {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    author: 'Peter Jackson',
    year: '2001'
    },
    {
    title: 'The Good, the Bad and the Ugly',
    author: 'Sergio Leone',
    year: '1966'
    },
];

// Create GET route to respond with JSON data when "/movies" root is requested
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Create GET route to respond with a welcome message when "/" root is requested
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

// Configure Express to serve static files from the "public" directory
app.use(express.static('public'));

// Create GET route to serve a specific HTML file when "/documentation.html" root is requested
app.get('/documentation.html', (req, res) => {
    // Send the "documentation.html" file from the "public" directory
    res.sendFile('public/documentation.html', {root: __dirname});
});

// Create a write stream to log HTTP request details to "log.txt" file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
// Configure Morgan to log HTTP requests using the combined format and the write stream
app.use(morgan('combined', {stream: accessLogStream}));

// Create error-handling middleware function to handle 404 (Not Found) errors
app.use((req, res) => {
    // Send custom error message
    res.status(404).send('Page Not Found!');
  });

// Create error-handling middleware function to handle 500 (Internal Server Error) errors
app.use((err, req, res, next) => {
    // Logs all application-level errors to the terminal
    console.error(err.stack);
    // Send a 500 (Internal Server Error) response
    res.status(500).send('Something broke!');
});

// Start Express server and listen on port 8080
app.listen(8080, () => {
    // Logs a message to confirm it is running
    console.log('My server is running on port 8080.');
});