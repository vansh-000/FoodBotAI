# FoodBot CRM - Lead Management System

A full-stack CRM system with AI-powered lead capture and management.

## Tech Stack

**Frontend**: React + Vite + Tailwind CSS 
**Backend**: Node.js + Express + Firebase Firestore  
**AI**: OpenAI integration with Modular Command Processor (MCP)

## Project Structure

```
.
├── frontend/           # React app
├── backend/            # Node.js API
└── README.md
```

## Quick Setup

### Backend Setup

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Create environment file**
```bash
touch .env
```

3. **Configure `.env`**
```env
OPENAI_API_KEY=__your openAI API key__
```

4. **Start backend**
```bash
npm run dev
```
Backend runs on: `http://localhost:3001`

### Frontend Setup

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Start frontend**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > Service Accounts
5. Generate new private key (download JSON)
6. Copy values from JSON to your backend `.env` file

## API Endpoints

### Lead Management
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### AI Command Processor
- `POST /mcp` - Execute AI commands

Example MCP request:
```json
{
  "command": "createLead",
  "payload": {
    "name": "Restaurant ABC",
    "source": "Instagram",
    "contact": {
      "email": "contact@restaurant.com",
      "phone": "555-0123"
    },
    "interestedProducts": ["POS System"],
    "status": "New",
    "notes": "Follow up needed"
  }
}
```

## Features

- ✅ Lead management (CRUD operations)
- ✅ AI-powered command processing
- ✅ Beautiful dashboard UI
- ✅ Real-time database with Firebase
- ✅ Input validation and error handling
- ✅ Responsive design

## Development Scripts

**Backend:**
```bash
npm run dev     # Start development server
npm start       # Start production server
```

**Frontend:**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Common Issues

1. **Firebase connection error**: Check project ID and private key format
2. **CORS issues**: Verify `FRONTEND_URL` in backend `.env`
3. **Port conflicts**: Change `PORT` in backend `.env` if needed

## Author

Vansh Verma
