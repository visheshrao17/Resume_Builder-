# Career Platform & AI Resume Builder

An enterprise-grade, high-performance career platform built with React 19, Zustand, TanStack Query, and a modern AI-powered Node.js backend to provide intelligent scoring, ATS optimization, and vector-based PDF exports.

## Architecture Highlights
![Architecture Overview](https://img.shields.io/badge/Architecture-Modern_React-blueviolet?style=for-the-badge)

- **State Management:** Hybrid approach utilizing **Zustand** for transient UI states (toggles, active indices) and **TanStack Query** for normalized server-state synchronization with optimistic updates.
- **Local-First Capabilities:** Users can draft resumes directly on the client using `localStorage` persistance without signing up. Seamless syncing upon authentication.
- **High-Fidelity Rendering:** Vector-based PDF generation via `@react-pdf/renderer`, ensuring standard ATS parsability without relying on fragile `window.print()` hacks.
- **Intelligent Features:** 
  - **Match Score UI:** Real-time resume vs. job description grading utilizing a client-side BM25 information retrieval algorithm.
  - **AI Bullet Coach:** An intelligent backend endpoint rewriting vague job histories into metric-driven (XYZ format) bullet points using structured OpenAI prompts.
  - **ATS Diagnostics:** An ATS simulation tool exposing how bots extract text to ensure formatting safety and completeness.
- **Testing & CI:** Test-driven BM25 utilities deployed with Vitest. Automated Github Actions workflow gating PRs against breaking builds.

## Technology Stack
- **Frontend:** React 19, Vite, Tailwind CSS, Zustand, TanStack Query, `@react-pdf/renderer`
- **Backend:** Express, MongoDB, OpenAI Node SDK
- **DevOps:** Vitest, Playwright, GitHub Actions

## Setup & Local Execution

### Client
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`

### Server
\`\`\`bash
cd server
npm install
# Ensure .env contains OPENAI_API_KEY and MONGO_URI
npm start
\`\`\`

### Testing
\`\`\`bash
cd client
npm run test  # Runs Vitest suites for algorithms
npx playwright test # Runs basic browser mounting E2E tests
\`\`\`

## Key Features

1. **AI Match Scoring Panel:** Paste the target Job Description to reveal a `BM25` retrieval match score evaluating missing and matched keywords.
2. **ATS Optimization Toggle:** Instantly strips styling to reveal how an applicant tracking system parses the core resume tokens.
3. **Bullet Point Engineer:** One click inside the experience form rewrites descriptions utilizing strict action-verb metric-driven layouts.
4. **Offline Resilience:** Auto-saving local drafts ensuring no data loss before backend synchronization.
