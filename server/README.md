# Resume Builder - Backend Server

This is the backend API for our Resume Builder application. It's built using Node.js, Express, and MongoDB to handle all the server-side operations.

## Features

- **User Authentication** - We're using JWT tokens with bcrypt for secure password hashing
- **Resume Management** - Full CRUD functionality for creating and managing resumes
- **Image Uploads** - Integrated with ImageKit for handling profile pictures
- **AI Integration** - Connected to OpenAI API to help enhance resume content
- **MongoDB Database** - Using Mongoose as our ODM for smooth database operations
- **Protected Routes** - Middleware authentication to keep everything secure

## What You'll Need

Before you can run this project locally, make sure you've got:

- Node.js (version 14 or above should work fine)
- MongoDB installed (either locally or you can use MongoDB Atlas)
- npm (comes with Node.js) or yarn if you prefer that

## Getting Started

1. First, clone the repo and navigate to the server folder:
```bash
git clone <repository-url>
cd server
```

2. Install all the dependencies:
```bash
npm install
```

3. You'll need to create a `.env` file in the server directory. Here's what it should look like:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
OPENAI_API_KEY=your_openai_api_key
```

Don't forget to replace the placeholder values with your actual credentials!

## Running the Server

### For Development
```bash
npm run server
```
This will start the server with nodemon, so it'll automatically restart whenever you make changes to the code.

### For Production
```bash
npm start
```

By default, the server runs on `http://localhost:5000` (unless you change the PORT in your .env file).

## Project Structure

Here's how the project is organized:

```
server/
├── configs/          # All configuration files live here
│   ├── db.js        # MongoDB connection setup
│   ├── imagekit.js  # ImageKit SDK configuration
│   └── multer.js    # File upload middleware config
├── controllers/      # Business logic and request handlers
│   ├── user.controller.js
│   └── resume.controller.js
├── middleware/       # Custom middleware functions
│   └── auth.middleware.js
├── models/          # Mongoose schemas and models
│   ├── user.model.js
│   └── resume.model.js
├── routes/          # API route definitions
│   ├── user.routes.js
│   └── resume.routes.js
├── .env             # Your environment variables (don't commit this!)
├── .gitignore       
├── package.json     
└── server.js        # Main entry point
```

## API Endpoints

Here are the main endpoints you can use:

### User & Authentication
- `POST /api/user/register` - Create a new user account
- `POST /api/user/login` - Log in and get a JWT token
- `GET /api/user/profile` - Get the logged-in user's profile (requires auth)

### Resume Operations
- `POST /api/resume/create` - Create a new resume (requires auth)
- `PUT /api/resume/update/:resumeId` - Update an existing resume (requires auth)
- `DELETE /api/resume/delete/:resumeId` - Delete a resume (requires auth)
- `GET /api/resume/get/:resumeId` - Get a specific resume by ID (requires auth)
- `GET /api/resume/public/:resumeId` - Get a public resume (no auth needed)

## Authentication

We're using JWT (JSON Web Tokens) for authentication. For protected routes, you need to include the token in the Authorization header like this:

```
Authorization: Bearer <your-jwt-token>
```

You'll get the token when you login, and you need to include it in subsequent requests to protected endpoints.

## Database Models

### User Model
The user schema includes:
- name
- email
- password (hashed with bcrypt before saving)
- createdAt and updatedAt timestamps

### Resume Model
Each resume has these fields:
- userId (reference to the user who created it)
- title
- personalInfo (name, contact details, etc.)
- professionalSummary
- experience (work history)
- education
- projects
- skills
- template (which template design to use)
- accentColor (for customization)
- public (boolean - whether it's publicly accessible)
- image (profile picture URL)
- createdAt and updatedAt timestamps

## Main Dependencies

Here's what we're using to power this server:

**Core Packages:**
- `express` - The web framework that handles routing and middleware
- `mongoose` - Makes working with MongoDB much easier
- `bcrypt` - Handles password hashing securely
- `jsonwebtoken` - Creates and verifies JWT tokens
- `cors` - Allows cross-origin requests from the frontend
- `dotenv` - Loads environment variables from .env file
- `multer` - Handles file uploads
- `@imagekit/nodejs` - ImageKit SDK for image management
- `openai` - OpenAI API client for AI features

**Dev Dependencies:**
## Configuration Setup

### Setting up MongoDB
You can use either a local MongoDB installation or MongoDB Atlas (cloud). Just add your connection string to the `.env` file:

For local MongoDB:
```env
MONGO_URI=mongodb://localhost:27017/resume-builder
```

For MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```

### JWT Secret Key
You should generate a strong random string for your JWT_SECRET. Here's a quick way to do it:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your JWT_SECRET in the .env file.

### ImageKit Configuration
1. Head over to [ImageKit.io](https://imagekit.io/) and create an account
2. Once you're in, grab your Public Key, Private Key, and URL Endpoint from the dashboard
3. Add these to your `.env` file

### OpenAI API Key
1. Go to [OpenAI's platform](https://platform.openai.com/) and sign up/login
2. Generate an API key from your account settings
3. Add it to your `.env` file as OPENAI_API_KEY

## HTTP Status Codes

The API uses standard HTTP status codes to indicate success or failure:
- `200` - Everything worked as expected
- `201` - Successfully created a new resource
- `400` - Bad request (usually validation errors)
- `401` - Not authenticated or invalid token
- `404` - Resource not found
- `500` - Something went wrong on our end

## Contributing

Feel free to contribute! Here's how:

1. Fork this repository
2. Create a new branch for your feature (`git checkout -b feature/YourFeatureName`)
3. Make your changes and commit them (`git commit -m 'Add some feature'`)
4. Push to your branch (`git push origin feature/YourFeatureName`)
5. Open a Pull Request and describe what you've added

## License

This project is under the ISC License - feel free to use it however you'd like!

## Acknowledgments

Shoutout to the amazing documentation from:
- Express.js team
- MongoDB docs
- JWT.io for making authentication easier to understand
- ImageKit for their straightforward SDK
- OpenAI for the API documentation
- ImageKit documentation
- OpenAI API documentation
