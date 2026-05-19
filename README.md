# AI Expense Tracker

A full-stack MERN expense tracker that uploads invoice images, extracts text with Google Cloud Vision OCR, uses Gemini through `@google/genai` to structure and categorize bill data, stores records in the MongoDB `expense` collection, and displays a dynamic React analytics dashboard.

## Folder Structure

```text
backend/
  config/db.js
  controllers/expenseController.js
  middleware/errorHandler.js
  middleware/upload.js
  models/Expense.js
  routes/expenseRoutes.js
  services/geminiService.js
  services/ocrService.js
  uploads/
  utils/parseExpense.js
  utils/validators.js
frontend/
  src/api/expenseApi.js
  src/components/
  src/utils/formatters.js
  src/App.jsx
  src/main.jsx
  src/styles.css
```

## Install

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment

Copy the placeholder files and replace values locally:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Backend placeholders:

```env
MONGO_URI=YOUR_MONGODB_URI
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GOOGLE_APPLICATION_CREDENTIALS=./vision-key.json
PORT=5000
CLIENT_URL=http://localhost:5173
```

Put your Google Vision service account JSON at `backend/vision-key.json` or update `GOOGLE_APPLICATION_CREDENTIALS`.

## Run

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`.

## API Summary

- `POST /api/expenses/upload` uploads an invoice image, runs OCR, asks Gemini for structured fields, and saves the expense.
- `POST /api/expenses` creates a manual expense.
- `GET /api/expenses` lists all expenses.
- `GET /api/expenses/:id` reads one expense.
- `PUT /api/expenses/:id` updates an expense.
- `DELETE /api/expenses/:id` deletes an expense.
- `GET /api/expenses/analytics` returns totals, category stats, trends, recent bills, and AI insights.

## Notes

- Uploaded files are limited to JPG, PNG, and WEBP under 5MB.
- Secrets are never hardcoded. Use `.env` files locally and keep real credentials out of source control.
- If Gemini is unavailable, the backend falls back to rule-based parsing so OCR uploads can still be reviewed.
