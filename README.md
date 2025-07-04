# chat_frontend
# Real-Time Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring WebSocket communication for instant messaging.

## Features

- Real-time messaging with WebSocket connections
- User authentication with usernames
- Message persistence in MongoDB
- Chat history retrieval
- Multiple concurrent users support
- Responsive React frontend
- Graceful connection handling

## Architecture

### Backend (Node.js + Express.js)
- **Express.js server** handling HTTP requests
- **WebSocket server** using the `ws` module for real-time communication
- **MongoDB integration** with Mongoose for message storage
- **Asynchronous I/O** for handling multiple concurrent connections
- **Message broadcasting** to all connected clients

### Frontend (React.js)
- **Single-page application** with modern React hooks
- **WebSocket client** using browser's native WebSocket API
- **Real-time message updates** with automatic reconnection
- **Responsive UI** with clean, modern design

### Database (MongoDB)
- **Message schema** with username, message content, and timestamp
- **Indexed queries** for efficient message retrieval
- **Automatic timestamps** for message ordering

## Project Structure

```
chatapp/
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Message.js
│   ├── routes/
│   │   └── messages.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.js
│   │   │   ├── MessageInput.js
│   │   │   └── UsernameInput.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb+srv://riva:<password_here>@cluster0.agej6x0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory (optional for local development):
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_WS_URL=ws://localhost:5000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## Usage

1. Open the application in your browser at `http://localhost:3000`
2. Enter your username to join the chat
3. Start sending and receiving messages in real-time
4. Messages are automatically saved and retrieved from the database

## Concurrency Handling

The application uses several asynchronous patterns to handle multiple concurrent users:

- **WebSocket connections**: Each client maintains an independent WebSocket connection
- **Message broadcasting**: Messages are broadcast to all connected clients simultaneously
- **Database operations**: All MongoDB operations are asynchronous using async/await
- **Connection management**: Proper cleanup of disconnected clients

## Design Choices

### WebSocket Implementation
- Used the native `ws` module instead of Socket.IO for simplicity and performance
- Implemented custom message protocol for username and message handling
- Added automatic reconnection logic on the frontend

### Database Schema
- Simple message schema with username, content, and timestamp
- Indexed on timestamp for efficient retrieval of recent messages
- No user authentication beyond username to keep it simple

### Frontend Architecture
- Functional components with React hooks for state management
- Custom hooks for WebSocket connection management
- Responsive design that works on desktop and mobile

## Error Handling

- **Network errors**: Automatic WebSocket reconnection with exponential backoff
- **Invalid inputs**: Client-side validation for usernames and messages
- **Database errors**: Graceful error handling with user feedback
- **Connection timeouts**: Proper cleanup and user notification

## Deployment

### Backend Deployment (Render/Heroku)
1. Connect your GitHub repository to Render/Heroku
2. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Port number (usually auto-assigned)
3. Deploy the backend

### Frontend Deployment (Netlify/Vercel)
1. Connect your GitHub repository to Netlify/Vercel
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Update WebSocket URL in the frontend to point to your deployed backend

## API Endpoints

### WebSocket Events
- `connection`: Client connects
- `username`: Client sends username
- `message`: Client sends message
- `disconnect`: Client disconnects

### HTTP Endpoints
- `GET /api/messages`: Retrieve recent messages
- `POST /api/messages`: Save a new message

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/chatapp
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
# Backend Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
NODE_ENV=development
```

**Note**: For production deployment, update the URLs to point to your deployed backend:
```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_WS_URL=wss://your-backend-url.com
NODE_ENV=production
```

## Technologies Used

- **Backend**: Node.js, Express.js, WebSocket (ws), Mongoose, MongoDB
- **Frontend**: React.js, WebSocket API, CSS3
- **Database**: MongoDB
- **Deployment**: Render/Heroku (backend), Netlify/Vercel (frontend)


