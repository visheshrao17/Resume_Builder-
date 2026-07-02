# Career Platform & AI Resume Builder

An enterprise-grade, high-performance career platform built with React 19, Zustand, TanStack Query, and a modern AI-powered Node.js backend to provide intelligent scoring, ATS optimization, and vector-based PDF exports.

## 🚀 Key Features

1. **AI Match Scoring Panel:** Paste the target Job Description to reveal a `BM25` retrieval match score evaluating missing and matched keywords.
2. **ATS Optimization Toggle:** Instantly strips styling to reveal how an applicant tracking system parses the core resume tokens.
3. **Bullet Point Engineer:** One click inside the experience form rewrites descriptions utilizing strict action-verb metric-driven layouts.
4. **Offline Resilience:** Auto-saving local drafts ensuring no data loss before backend synchronization.

## 🏗️ Architecture Highlights
![Architecture Overview](https://img.shields.io/badge/Architecture-Modern_React-blueviolet?style=for-the-badge)

- **State Management:** Hybrid approach utilizing **Zustand** for transient UI states (toggles, active indices) and **TanStack Query** for normalized server-state synchronization with optimistic updates.
- **Local-First Capabilities:** Users can draft resumes directly on the client using `localStorage` persistence without signing up. Seamless syncing upon authentication.
- **High-Fidelity Rendering:** Vector-based PDF generation via `@react-pdf/renderer`, ensuring standard ATS parsability without relying on fragile `window.print()` hacks.
- **Intelligent Features:** 
  - **Match Score UI:** Real-time resume vs. job description grading utilizing a client-side BM25 information retrieval algorithm.
  - **AI Bullet Coach:** An intelligent backend endpoint rewriting vague job histories into metric-driven (XYZ format) bullet points using structured Gemini prompts.
  - **ATS Diagnostics:** An ATS simulation tool exposing how bots extract text to ensure formatting safety and completeness.
- **Testing & CI:** Test-driven BM25 utilities deployed with Vitest. Automated Github Actions workflow gating PRs against breaking builds.

## 💻 Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Zustand, TanStack Query, `@react-pdf/renderer`
- **Backend:** Express, Node.js, MongoDB (Mongoose), Google Generative AI (Gemini Node SDK), ImageKit
- **DevOps:** Vitest, Playwright, GitHub Actions

## 🛠️ Setup & Local Execution

### Prerequisites

Before getting started, ensure you have the following installed and set up:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **Gemini API Key** (Get it from [Google AI Studio](https://aistudio.google.com/))
- **ImageKit Account** (For image uploads, get keys from [ImageKit.io](https://imagekit.io/))

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Resume_Builder-
```

### 2. Server Setup

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the root of the `server` directory and add your configuration details. Use the following template:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Google Generative AI (Gemini)
GEMINI_API_KEY=your_gemini_api_key
# GEMINI_MODEL=gemini-2.5-flash (Optional)

# ImageKit (For image uploads)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Server Port
PORT=3000
```

Start the backend server (you can use `npm run server` for Nodemon or `npm start` for Node):

```bash
npm run server
```
*The server should now be running on `http://localhost:3000`.*

### 3. Client Setup

Open a new terminal window, navigate to the `client` directory, and install dependencies:

```bash
cd client
npm install
```

Start the React development server:

```bash
npm run dev
```
*The client should now be running on `http://localhost:5173`.*

## 🧪 Testing

The project includes test suites for algorithmic validation and End-to-End (E2E) UI testing. 

Navigate to the `client` directory to run the tests:

```bash
cd client

# Run Vitest suites for algorithms (BM25, state, etc.)
npm run test

# Run basic browser mounting E2E tests via Playwright
npx playwright test
```

## 📜 License

MIT License (or your applicable license)
