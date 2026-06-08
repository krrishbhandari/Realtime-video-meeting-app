# 🎥 Apna Video Call

> A Zoom-style video conferencing web app built with the MERN stack, WebRTC, and Socket.IO for real-time peer-to-peer meetings and chat.

**Live Demo:** [apnavideocall-rsgi.onrender.com](https://apnavideocall-rsgi.onrender.com)

---

## 🔗 Quick Links

| Link | Action |
|---|---|
| 🚀 Live Demo | [Open App](https://apnavideocall-rsgi.onrender.com) |

---

## 🔎 Overview

Apna Video Call lets users register, log in, or join as a guest, create a unique meeting code, and invite others into the same room. The meeting supports real-time video/audio communication, screen sharing, and a live chat box. All chat messages sent during a meeting are saved with the sender name, date, and time.

This project was built to understand the core architecture behind platforms like Zoom and Google Meet, including signaling, media streams, and full-stack real-time communication.

---

## ✨ Features

- User authentication with register and login flows.
- Guest joining with a custom meeting code.
- Unique room creation and sharing for private meetings.
- One-on-one and group video conferencing.
- Real-time chat during the meeting.
- Chat history saved with sender name, message, date, and time.
- Screen sharing support.
- Real-time signaling using Socket.IO.

---

## 🛠️ Tech Stack

- Frontend: React.js, Vite, React Router, Material UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Communication: Socket.IO
- Media Streaming: WebRTC
- Authentication and Authorization: Custom MERN-based flow

---

## 🧭 How It Works

1. A user creates or enters a meeting code.
2. The code is shared with friends or teammates.
3. Everyone joins the same room through the app.
4. WebRTC handles direct audio/video streaming between peers.
5. Socket.IO manages signaling and live chat updates.
6. Chat messages are stored for later reference with timestamps and sender details.

---

## 📁 Project Structure

- `Backend/` - Express API, Socket.IO controller logic, models, and routes.
- `Frontend/` - React client, pages, contexts, and UI styles.
- `Backend/src/controllers/` - Socket and user controllers.
- `Backend/src/models/` - MongoDB models for users and meetings.
- `Backend/src/routes/` - API routes for user operations.
- `Frontend/src/pages/` - Authentication, landing, home, history, and video meeting screens.
- `Frontend/src/contexts/` - Auth state management.

---

## ⚙️ Local Setup

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🌍 Environment Variables

Create your own `.env` file in the backend before running the app. The exact variables depend on your deployment setup, but typically include:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

If your frontend uses environment-specific API or socket URLs, add the matching values in the frontend environment file.

---

## 💡 Why This Project Matters

Apna Video Call demonstrates how modern video meeting apps work under the hood. It combines full-stack development, real-time messaging, peer-to-peer communication, and persistent chat storage in one project.

---

## 👤 Author

Built with ❤️ by Krish Bhandari.
