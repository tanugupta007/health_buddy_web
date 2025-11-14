# Gemini API Setup Guide

This guide will help you set up Google Gemini API for the Health Buddy chatbot and symptom checker.

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key" or "Get API Key"
4. Copy your API key (it will look like: `AIzaSy...`)

## Step 2: Add API Key to Environment

1. Navigate to the `backend` folder
2. Open or create the `.env` file
3. Add the following line:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the API key you copied in Step 1.

## Step 3: Restart Backend Server

After adding the API key, restart your backend server:

```bash
cd backend
npm start
```

## Features Enabled

Once configured, the following features will use Gemini AI:

- **Chatbot**: AI-powered health conversations in English and Hindi
- **Symptom Checker**: Intelligent symptom analysis and recommendations

## Fallback Behavior

If the Gemini API key is not set or there's an error:
- The application will fall back to local predefined responses
- Users can still use the application, but with limited AI capabilities

## Troubleshooting

### API Key Not Working
- Verify the key is correct (no extra spaces)
- Check if the key has proper permissions
- Ensure you're using the correct API key format

### Rate Limits
- Free tier has rate limits
- Consider upgrading if you need higher limits

### Error Messages
- Check backend console for detailed error messages
- Verify MongoDB is running (required for saving chat/symptom history)

## Security Note

⚠️ **Important**: Never commit your `.env` file to version control. The `.env` file should be in `.gitignore`.

