// Import the HTTP module
const http = require('http');

// Import the 'today' module
const today = require('./today');

// Define the request listener function
const requestListener = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set status and content type

    const dateVal = today.getDate(); // Get the current date from the 'today' module

    // Ensure dateVal is a Date object
    if (!(dateVal instanceof Date)) {
        res.end("Error: Invalid date received from today module.");
        return;
    }

    // Determine the appropriate greeting based on the current time
    let greeting = "It is still not morning";
    const hours = dateVal.getHours();

    if (hours >= 6 && hours < 12) {
        greeting = "Good morning!";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Good afternoon!";
    } else if (hours >= 18 && hours < 21) {
        greeting = "Good evening!";
    } else if (hours >= 21 && hours < 24) {
        greeting = "Good night!";
    }

    // Send the response with the appropriate greeting
    res.end(`Hello, ${greeting}`);
};

// Define the port number
const port = 8080;

// Create an HTTP server using the request listener function
const server = http.createServer(requestListener);

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
