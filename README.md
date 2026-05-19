# AI Expense Tracker Frontend

React + Vite dashboard for the AI Expense Tracker.

## Local Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

For local backend development, run the backend separately at `http://localhost:5000`.

## Environment

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

For Vercel, set `VITE_API_URL` to your Render backend API URL:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

## Vercel

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
