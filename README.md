## Airbnb Clone Website
This is a clone of Airbnb, a popular online marketplace for vacation rentals. This project is built using Node.js for the backend.
<hr>

## Table of Contents

<ul>
   <li>Features</li>
   <li> Technologies & Packages Used</li>
   <li>Key Features</li>
   <li>How to Install</li>
   <li> Challenges & Solutions</li>
   <li>Author</li>
   <li>Project Link</li>

</ul>

## Features
1. User Authentication: Users can sign up, log in, and log out securely.
2. Property Listings: Users can view available properties for rent.
3. Property Details: Detailed information about each property, including description, amenities, location, and photos.
4. Booking System: Users can make reservations for properties.
5. Reviews and Ratings: Users can leave reviews and ratings for properties they have stayed in.
<hr>

## Technologies & Packages Used

### Backend

<ul>
   <li>MongoDB: NoSQL database for flexible and scalable data storage.</li>
   <li> Express.js: Web application framework for Node.js, providing robust features for web and mobile applications.</li>
   <li>Node.js: JavaScript runtime for server-side development.</li>
   
</ul>


### Authentication

 
<ul>
   <li>Passport.js: Middleware for user authentication, supporting various strategies.</li>
   <li> Dotenv: Environment variable management for secure configuration.</li>  
</ul>
 

### Image Storage

 Cloudinary: Cloud-based image and video management solution.

### Maps

Mapbox: Platform for custom maps and location-based experiences.

### Frontend

EJS: Embedded JavaScript templates for dynamic content rendering.

### Session Management

Connect Flash: Middleware for flash messages.
Connect Mongo: MongoDB session store for Express.js.
Cookie Parser: Middleware for parsing cookies.

### Validation
Joi: Library for data validation.

### Object Modeling
Mongoose: MongoDB object modeling for Node.js.

### File Uploads
Multer: Middleware for handling file uploads.

### Social Authentication
Passport Local: Local authentication strategy.
Passport Local Mongoose: Mongoose-specific authentication strategy. Authentication

## Key Features

User Authentication: Login, Logout, and Signup
CRUD Operations: Add, Edit, and Delete Listings
Review System: Add and Delete Reviews
User Data Security: Password Hashing and Encryption
Interactive Maps: Leveraging Mapbox for Location Visualization
Login with Email: Traditional email login for user convenience
<hr>


## How to Install

Follow these steps to set up and run the project locally:
 
 1. Clone the Repository:

    https://github.com/Saurabh-Sharma-1999/Airbnb-Major-Project
    cd Airbnb-Major-Project

2. Install Dependencies:

     npm install

3. Set Up Environment Variables:

    Configure the following environment variables by creating a .env file in the root of your project:

        CLOUD_NAME=
        CLOUD_API_KEY=
        CLOUD_API_SECRET=
        MAP_TOKEN=
        ATLASDB_URL=
        SECRET=

    Replace the values with your specific configurations.

4. Run the Application:

    node app.js

5. Open in Your Browser:

    Open http://localhost:8080/listings in your web browser.

## Challenges & Solutions

   Encountered challenges, especially with data handling, but implemented efficient solutions. Overcame scalability issues with a well-architected backend.

## Author
    Saurabh Sharma
    Email: sharmas81969@gmail.com
    LinkedIn :

## Project Link

<a href="https://airbnb-major-project-sbjr.onrender.com/">Live Link</a>

## Thank You

Thank you for exploring Airbnb! Your feedback is valuable. If you have any suggestions or thoughts, feel free to share them with us. 
