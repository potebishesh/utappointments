# UTAppointments
Team members: Bailey, Bishesh, Tyler

### Vision Statement:
“Simple aesthetic, easy to follow, and easy setup for making office hours appointments”  

# Documentation:

https://docs.google.com/document/d/1olBxjYKcjPXCY4DLDj05zYgYOF5RVmVbUcX-wEYVFaM/edit

# Getting Started

To get the Node server running locally:

 - Clone this repo
 - `npm install` to install all required dependencies
 - Create .env file and insert required environment variables (see dbService.js)
 - Make sure MySQL server is running locally on machine with correct database
 - `nodemon app.js` to start the local server

# Code Overview

## Dependencies:
 - cors - allows API calls from front end to backend  
 - dotenv - place to store configs for our database like passwords, good practice for security reasons  
 - express - a robust framework for creating web and mobile apps  
 - mysql - lets us interface with mySQL server and make queries  
 - nodemon - updates the server so don't have to restart script all the time, it'll watch for us  
 - bcrypt - lets us hash passwords
 - passport - persist a logged in user until they time-out or click the log out button
 - passport-local - allows us to use usernames and passwords for logging in
 - express-session - stores and persists logged in user across webpages
 - express-flash - for popping up messages on screen
 - method-override - overrides POST method inside HTML to run another specified function

## Application Structure:
 - `app.js` - File used to start web server.  
 - `controllers/` - Folder containing business logic like UserController.js or AnalyticsController.js.
 - `public/` - Folder containing image/js/css files.
 - `routes/` - Folder containing routing logic.
 - `views/` - Folder containing HTML/ejs files.
