# Backend Deployment Guide

## Deploy on Render

### 1. Go to Render.com
- Sign up/Login at https://render.com
- Click "New +" → "Web Service"

### 2. Connect Your Repository
- Connect your GitHub account
- Select your `Zestora` repository
- Set the **Root Directory** to: `backend`

### 3. Configure the Service
- **Name**: `zestora-backend` (or any name you prefer)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Environment Variables
Add these environment variables in Render:

```
PORT=10000
FRONTEND_URL=https://zestora.vercel.app
MONGO_URI=mongodb+srv://anujyadav:0rEFmBL2arNbwJND@cluster0.lkpzvrl.mongodb.net/anuj?retryWrites=true&w=majority&appName=Cluster0
```

### 5. Deploy
- Click "Create Web Service"
- Render will automatically deploy your backend

### 6. Update Frontend
Once deployed, update your frontend API calls to use the new backend URL:
- Replace `http://localhost:5000` with your Render URL
- Example: `https://zestora-backend.onrender.com`

## Alternative: Deploy on Railway

### 1. Go to Railway.app
- Sign up/Login at https://railway.app
- Click "New Project" → "Deploy from GitHub repo"

### 2. Select Repository
- Choose your `Zestora` repository
- Set the **Root Directory** to: `backend`

### 3. Environment Variables
Add the same environment variables as above.

### 4. Deploy
- Railway will automatically deploy your backend

## Environment Variables Explained

- **PORT**: Render will set this automatically (usually 10000)
- **FRONTEND_URL**: Your Vercel frontend URL
- **MONGO_URI**: Your MongoDB Atlas connection string

## Testing Your Deployment

After deployment, test your API:
```
GET https://your-backend-url.onrender.com/
```

Should return: `{"message": "Welcome to Zestora API"}` 