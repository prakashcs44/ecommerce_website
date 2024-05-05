# E-Commerce Website (MERN Stack)

Welcome to my e-commerce website project! This project is a full-stack web application built using the MERN stack, comprising MongoDB, Express.js, React.js, and Node.js. 

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure user authentication system allowing users to sign up, log in, and log out securely.
- **Product Management:** Add, edit, and delete products, and update product details.
- **Shopping Cart:** Add products to the shopping cart, update quantities, and proceed to checkout.
- **Order Management:** View order history, track order status, and manage shipping and billing information.
- **Search and Filters:** Search for products by name, category, or price range. Apply filters to refine search results.
- **Responsive Design:** Fully responsive design ensures seamless user experience across all devices.

## Technologies Used

- **Frontend:**
  - React.js: Frontend JavaScript library for building user interfaces.
  - Redux: State management library for managing application state.
  - React Router: Declarative routing for React applications.
  - Material-UI: React components implementing Google's Material Design.
  -TailwindCss: For styling with prebuild css classes
- **Backend:**
  - Node.js: Server-side JavaScript runtime environment.
  - Express.js: Web application framework for Node.js.
  - MongoDB: NoSQL database for storing application data.
  - Mongoose: MongoDB object modeling tool for Node.js.
  - Stripe:For payment
- **Others:**
  - JWT: JSON Web Tokens for user authentication.
  - Axios: Promise-based HTTP client for making requests to the backend.
  - Bcrypt.js: Library for hashing passwords before storing in the database.
  -Stripe: for payment
  -cloudinary - for uploading files

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prakashcs44/e-commerce-mern.git

2. Go to the project directory and install dependencies for both the client and server

   ```bash
   cd client
   npm install

   ```bash
   cd server
   npm install

3. Create a .env file in server directory and add the environment variables as shown in the .env.example files.

4. Start the server

   ```bash
   cd server
   npm start


 5. Start the client

   ```bash
   cd client
   npm run dev
 

 

