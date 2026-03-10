# Vercel Deployment Guide

## What Changed?

To deploy on Vercel, we converted from a traditional Express server to **serverless functions**:

### Files Created:
1. **`api/verify.js`** - Serverless function that handles `/api/verify` endpoint
2. **`vercel.json`** - Vercel configuration for routing
3. **`.env.production`** - Production environment variables
4. **`.env.development`** - Local development environment variables

### Files Updated:
- **`src/App.jsx`** - Now uses environment variable for API URL
- **`package.json`** - Added `vercel-build` script

## Local Development

Keep your existing setup:

```bash
# Terminal 1: Run MongoDB-connected server
cd server
nodemon server.js

# Terminal 2: Run Vite dev server
npm run dev
```

## Deploy to Vercel

### Step 1: Install Vercel CLI (optional)
```bash
npm i -g vercel
```

### Step 2: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Vite
5. Click "Deploy"

### Step 3: Set Environment Variables (Important!)

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/product_verification?retryWrites=true&w=majority&appName=HACKETHIC
```

### Step 4: Update App.jsx API URL (if needed)

The app will automatically use:
- **Local**: `http://localhost:5000` (from `.env.development`)
- **Production**: `/api` (from `.env.production`)

## How It Works

### Frontend (Vite)
- Builds static files to `/dist`
- Served by Vercel CDN

### Backend (Serverless)
- `api/verify.js` handles POST `/api/verify`
- Runs on-demand (no always-on server)
- MongoDB connection is cached

### Routing
```
your-app.vercel.app/          → index.html (Frontend)
your-app.vercel.app/api/verify → api/verify.js (Backend)
```

## Testing After Deploy

1. Get your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Test the form
3. Test QR code scanning

## Troubleshooting

### 404 Error
- Check `vercel.json` exists in root
- Verify `api/` folder exists

### Database Connection Error
- Add `MONGODB_URI` in Vercel environment variables
- Redeploy after adding env vars

### CORS Error
- Serverless function already handles CORS
- Check browser console for exact error

## Important Notes

⚠️ **Keep `server/server.js` for local development**  
⚠️ **Don't push `.env` files to Git** (already in `.gitignore`)  
⚠️ **Serverless functions have cold starts** (first request may be slower)
