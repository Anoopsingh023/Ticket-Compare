# Ticket Compare (Anslation Frontend Assignment)

A React + Vite frontend to search routes and compare ticket prices (Flights via RapidAPI, Bus/Train via mock data).

## Features
- Search form: From → To → Date → Travel Type (Flight / Bus / Train)
- Flight API integration (RapidAPI) with mock fallback (so reviewers can test without API key)
- Results list with price, carrier/operator, duration, stops, departure/arrival
- Sorting (price, duration, departure) and stops filter
- Responsive and accessible UI

## Setup
1. Install dependencies:
```bash
npm install
```

2. Run dev server:
```bash
npm run dev
```

3. (Optional) Create `.env` from `.env.example` and add RapidAPI credentials:
```
VITE_RAPIDAPI_KEY=your_key
VITE_FLIGHT_API_HOST=skyscanner80.p.rapidapi.com
VITE_FLIGHT_API_URL=https://skyscanner80.p.rapidapi.com/api/v1/flights/search
```

If `.env` is not provided the app uses the mock data in `public/mock/`.

## Build
```bash
npm run build
```

## Deploy
- Vercel: Import repo -> Framework: Vite -> Deploy (add env vars if used)
- Netlify: Build command `npm run build`, publish `dist`

## Submission template
```
Full Name: Anoop Singh
Email ID: <your email>
Phone Number: <your phone>
Task Name: Ticket Compare
GitHub Link: https://github.com/<username>/ticket-compare
Live Demo: https://ticket-compare.vercel.app
```
