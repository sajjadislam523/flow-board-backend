# Flow Board - Backend

## Short Description
This backend is built using Express.js and MongoDB to serve as the API for a task management application. It provides RESTful endpoints for user management and task operations such as creation, retrieval, updating, and deletion. The server also uses CORS to allow cross-origin requests and dotenv for managing environment variables.

## Live Links
- **Live API :** [https://backend-teal-five-18.vercel.app/](https://backend-teal-five-18.vercel.app/)
- **GitHub Repository:** [https://github.com/yourusername/backend](https://github.com/sajjadislam523/flow-board-backend)

## Dependencies
- **cors**: ^2.8.5
- **dotenv**: ^16.4.7
- **express**: ^4.21.2
- **mongodb**: ^6.13.0

## Installation Steps

1. **Clone the Repository:**
   
   git clone https://github.com/sajjadislam523/flow-board-backend
   cd backend

2. **Install Dependencies:**

- npm install

3. **Set Up Environment Variables:**
Create a .env file in the root directory of the backend with the following content (adjust values accordingly):

    PORT=5000
    DB_USER=your_mongodb_username
    DB_PASS=your_mongodb_password

4. **Run the server:**
- npm start

## Technologies Used:
- Express.js: A fast, unopinionated, minimalist web framework for Node.js.
- MongoDB: A NoSQL database for data persistence.
- CORS: Middleware for enabling Cross-Origin Resource Sharing.
- dotenv: Module to load environment variables from a .env file.

