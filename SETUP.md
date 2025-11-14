# Quick Setup Guide

## Step 1: Install MongoDB

### Windows
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 3: Configure Environment

Create `.env` file in `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthbuddy
JWT_SECRET=healthbuddy_secret_key_2025_change_in_production
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** 
- Get your Gemini API key from: https://makersuite.google.com/app/apikey
- Replace `your_gemini_api_key_here` with your actual API key
- The Gemini API is used for AI-powered chatbot and symptom analysis features

## Step 4: Start Backend Server

```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server is running on port 5000
📡 API available at http://localhost:5000/api
```

## Step 5: Start Frontend

Open a new terminal and start a simple HTTP server:

### Option 1: Python
```bash
python -m http.server 8000
```

### Option 2: Node.js
```bash
npx http-server -p 8000
```

### Option 3: PHP
```bash
php -S localhost:8000
```

## Step 6: Access the Application

Open your browser and go to:
- Frontend: `http://localhost:8000`
- Backend API: `http://localhost:5000/api`

## Testing the API

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Troubleshooting

### MongoDB Not Running
- Check if MongoDB service is running
- On Windows: Check Services panel
- On Linux/Mac: `sudo systemctl status mongodb` or `brew services list`

### Port Already in Use
- Change PORT in `.env` file
- Update API_BASE_URL in `api.js` to match

### CORS Errors
- Ensure backend is running
- Check API_BASE_URL in `api.js` matches backend URL

## Development Mode

For auto-reload during development:

```bash
cd backend
npm run dev
```

This uses nodemon to automatically restart the server on file changes.
