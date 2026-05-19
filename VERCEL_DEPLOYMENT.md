# Vercel Deployment

Deploy from the repository root.

## Vercel Settings

- Framework Preset: Vite
- Build Command: `npm run build --prefix frontend`
- Output Directory: `frontend/dist`
- Install Command: `npm install --prefix backend && npm install --prefix frontend`

These are also stored in `vercel.json`, so Vercel should pick them up automatically.

## Environment Variables

Add these in Vercel Project Settings -> Environment Variables:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=https://your-vercel-app.vercel.app
```

For Google Vision OCR, either add `GOOGLE_APPLICATION_CREDENTIALS` only if you provide a credentials file during deployment, or update the backend to use a JSON credential stored in an environment variable. Without Vision credentials, the app falls back to local OCR where possible.

## Routes

- Frontend: `/`
- API health: `/api/health`
- Expenses API: `/api/expenses`
