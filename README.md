# Health Buddy - Full Stack Health Application

A comprehensive health application with AI-powered symptom checker, bilingual chatbot (English/Hindi), and health information resources.

## Features

- 🔐 User Authentication (Sign up, Login, Logout)
- 🔍 AI Symptom Checker
- 💬 Bilingual Health Chatbot (English/Hindi)
- 📸 Disease Information Photos
- 🎥 Health Education Videos
- 📊 User Chat and Symptom History
- 🎨 Modern, Responsive UI

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Modern UI with gradient themes
- Responsive design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- RESTful API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd healthbuddy
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthbuddy
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a secure random string in production.

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### 5. Start the Backend Server

```bash
cd backend
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend server will start on `http://localhost:5000`

### 6. Start the Frontend

Open the frontend files in a web browser. You can use a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
healthbuddy/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Chat.js
│   │   └── SymptomCheck.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── chat.js
│   │   └── symptoms.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── api.js
├── auth.js
├── buddy.js
├── index.html
├── login.html
├── signup.html
├── buddy.html
├── about.html
├── contact.html
├── sevice.html
├── style.css
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Users
- `GET /api/users` - Get all users (Protected)
- `GET /api/users/:id` - Get user by ID (Protected)

### Chat
- `POST /api/chat` - Save chat message (Protected)
- `GET /api/chat` - Get chat history (Protected)
- `DELETE /api/chat/:id` - Delete chat message (Protected)

### Symptoms
- `POST /api/symptoms` - Save symptom check (Protected)
- `GET /api/symptoms` - Get symptom check history (Protected)
- `GET /api/symptoms/:id` - Get specific symptom check (Protected)

## Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Login with your credentials
3. **Home**: Access the main dashboard
4. **Health Buddy**: 
   - Check symptoms
   - Chat with AI assistant (English/Hindi)
   - Browse disease photos and videos
5. **Services**: View available health services
6. **About**: Learn about Health Buddy
7. **Contact**: Contact form

## Database Models

### User
- username (unique)
- email (unique)
- password (hashed)
- createdAt
- lastLogin

### Chat
- userId
- message
- response
- language (en/hi)
- createdAt

### SymptomCheck
- userId
- symptoms
- analysis
- language (en/hi)
- createdAt

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- CORS enabled
- Input validation

## Development

### Running in Development Mode

Backend with auto-reload:
```bash
cd backend
npm run dev
```

### Testing API Endpoints

You can test the API using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MongoDB URI in `.env` file
- Verify MongoDB port (default: 27017)

### CORS Errors
- Ensure backend CORS is enabled
- Check API base URL in `api.js`

### Authentication Issues
- Verify JWT_SECRET in `.env`
- Check token expiration
- Clear browser localStorage if needed

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Use MongoDB Atlas or secure MongoDB instance
4. Set up HTTPS
5. Configure CORS for production domain
6. Use environment variables for sensitive data

## License

This project is licensed under the ISC License.

## Contributors

- Your Name

## Support

For support, email your-email@example.com or open an issue in the repository.
