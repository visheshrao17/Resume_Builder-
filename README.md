# AI Resume Builder

A full-stack application for building professional resumes with the power of AI. This application allows users to create, customize, and download resumes, leveraging OpenAI for content generation and ImageKit for asset management.

## Tech Stack

### Frontend
- **React**: UI library for building the interface.
- **Redux Toolkit**: State management.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Vite**: Next Generation Frontend Tooling.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for flexible data storage.

### Services
- **OpenAI**: Powers the AI features for generating resume content.
- **ImageKit**: Handling image uploads and storage.

## Features
- **Interactive Resume Builder**: Easy-to-use interface for adding education, experience, skills, and projects.
- **AI Content Generation**: Generate professional descriptions and summaries using AI.
- **Real-time Preview**: See changes to your resume instantly.
- **User Authentication**: Secure signup and login functionality.
- **PDF Export**: Download your resume as a professional PDF.

## Installation Guidelines

> [!IMPORTANT]
> Ensure you have **Node.js** and **npm** installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/visheshrao17/Resume_Builder-.git
cd Resume_Builder-
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=your_openai_base_url
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the backend server:
```bash
npm run server
```

### 3. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_BASE_URL=http://localhost:3000
```

Start the frontend development server:
```bash
npm run dev
```

## Environment Variables

### Server (`server/.env`)
| Variable | Description |
|----------|-------------|
| `PORT` | Port for the backend server (default: 3000) |
| `MONGODB_URI` | Connection string for MongoDB |
| `OPENAI_API_KEY` | API Key for OpenAI |
| `OPENAI_BASE_URL` | Base URL for OpenAI API (if using a proxy or specific endpoint) |
| `IMAGEKIT_PRIVATE_KEY` | Private key for ImageKit integration |

### Client (`client/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Base URL of the backend API |

