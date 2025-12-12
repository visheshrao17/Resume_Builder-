# Resume Builder - Frontend

This is the frontend application for our Resume Builder project. Built with React and Vite, it provides a smooth and interactive user experience for creating professional resumes.

## Features

- **Modern UI** - Clean, responsive interface built with React and Tailwind CSS
- **Resume Templates** - Multiple professional templates to choose from
- **Real-time Editing** - See your changes instantly as you type
- **Color Customization** - Pick accent colors to personalize your resume
- **PDF Export** - Download your resume as a PDF file
- **User Authentication** - Secure login and registration with JWT
- **Dashboard** - Manage all your resumes in one place
- **Resume Preview** - See how your resume looks before downloading

## Tech Stack

Here's what we're using to build this:

- **React 19** - The latest version for building the UI
- **Vite** - Super fast build tool and dev server
- **React Router** - For handling navigation between pages
- **Redux Toolkit** - State management for user auth and app data
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - Making API requests to the backend
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant toast notifications

## Getting Started

### Prerequisites

Make sure you have these installed:
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository and navigate to the client folder:
```bash
git clone <repository-url>
cd client
```

2. Install all the dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory (if needed for API endpoints):
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The app should now be running at `http://localhost:5173` (Vite's default port).

## Available Scripts

Here are the commands you can run:

### `npm run dev`
Starts the development server with hot reload. This is what you'll use most of the time while developing.

### `npm run build`
Builds the app for production. Creates an optimized build in the `dist` folder.

### `npm run preview`
Preview the production build locally before deploying.

### `npm run lint`
Runs ESLint to check for code quality issues.

## Project Structure

Here's how the frontend is organized:

```
client/
├── public/              # Static assets
├── src/
│   ├── app/            # Redux store and slices
│   │   ├── store.js
│   │   └── features/   # Redux slices (auth, etc.)
│   ├── assets/         # Images, fonts, and other assets
│   ├── components/     # Reusable UI components
│   │   ├── home/       # Homepage components
│   │   └── templates/  # Resume template components
│   ├── configs/        # Configuration files
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ResumeBuilder.jsx
│   │   ├── Preview.jsx
│   │   └── Layout.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── package.json
```

## Key Pages

### Home Page
The landing page with hero section and feature highlights. This is where users learn about the app.

### Login/Register
Authentication pages where users can sign up or log into their accounts.

### Dashboard
After logging in, users see all their saved resumes here. They can create new ones, edit existing ones, or delete them.

### Resume Builder
The main editor where users fill in their information and customize their resume. Includes:
- Personal information form
- Work experience section
- Education details
- Skills and projects
- Template selector
- Color picker

### Preview
Shows a full-page preview of the resume before downloading or sharing.

## State Management

We're using Redux Toolkit to manage the application state. The main slices include:

- **Auth Slice** - Handles user authentication state (login, logout, token management)
- Other slices can be added as the app grows

## Styling

The app uses Tailwind CSS for styling. The configuration includes:
- Custom color schemes
- Responsive breakpoints
- Custom utilities

Global styles are defined in `index.css`.

## API Integration

The frontend communicates with the backend API using Axios. All API calls are configured to work with the backend server (default: `http://localhost:5000`).

Make sure the backend server is running before starting the frontend, otherwise you'll see connection errors.

## Building for Production

When you're ready to deploy:

1. Build the production bundle:
```bash
npm run build
```

2. The optimized files will be in the `dist` folder. You can deploy this folder to any static hosting service like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

3. Preview the production build locally:
```bash
npm run preview
```

## Environment Variables

If you need to use environment variables, create a `.env` file in the client directory. Remember to prefix all variables with `VITE_`:

```env
VITE_API_URL=your_backend_api_url
```

Access them in your code like this:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## Browser Support

This app works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Want to contribute? Great! Here's how:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/CoolFeature`)
3. Make your changes
4. Commit them (`git commit -m 'Add some cool feature'`)
5. Push to your branch (`git push origin feature/CoolFeature`)
6. Open a Pull Request

## Common Issues

**Port already in use?**
If port 5173 is already taken, Vite will automatically try the next available port. Check the terminal output to see which port it's using.

**API connection errors?**
Make sure your backend server is running and the API URL is correctly configured.

**Build fails?**
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

## License

This project is licensed under the ISC License.

## Acknowledgments

Thanks to:
- React team for an amazing framework
- Vite team for the blazing fast build tool
- Tailwind CSS for making styling so much easier
- The open-source community for all the awesome packages we're using
