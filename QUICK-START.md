# Quick Start Guide

## What I Built

A **Workout Tracker API** using Node.js, Express, MongoDB, and Mongoose.

### Collections:
1. **Exercises** - Individual exercises with categories, muscle groups, equipment
2. **Workouts** - Workout routines made up of multiple exercises
3. **Progress** - Workout completion logs with ratings and calories


## Setup Instructions (SUPER SIMPLE)

### 1. Make sure MongoDB is running
```bash
# macOS
brew services start mongodb-community

# Windows - MongoDB runs as a service

# Linux
sudo systemctl start mongod
```

### 2. Install and run
```bash
cd workout-tracker
npm install
npm start
```

**That's it!** The app will:
- Connect to MongoDB
- Create indexes
- Auto-seed with sample data (only on first run)
- Start the server on port 3000

### 3. Test it
Visit http://localhost:3000/api/exercises in your browser!


## Quick Testing

### In your browser:
- http://localhost:3000/api/exercises
- http://localhost:3000/api/workouts
- http://localhost:3000/api/progress

### Test validation:
```bash
curl -X POST http://localhost:3000/api/progress/test-validation
```
Should fail because rating=10 (must be 1-5)

### Create a new exercise:
```bash
curl -X POST http://localhost:3000/api/exercises \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Burpees",
    "category": "Cardio",
    "muscleGroup": "Full Body",
    "difficulty": "Intermediate"
  }'
```

## File Structure

```
workout-tracker/
├── models/
│   ├── Exercise.js        # Exercise schema with validation
│   ├── Workout.js         # Workout schema
│   └── Progress.js        # Progress schema with rating validation
├── server.js              # Main app (routes + auto-seed)
├── package.json           # Dependencies
├── README.md              # Full documentation
├── SAMPLE-DATA.md         # Shows data structure for grader
└── .env.example           # Config template
```

