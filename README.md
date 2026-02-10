# Workout Tracker 
Hello Constance or Dylan,

This is simple fitness tracking application. It tracks exercises, create workout routines, and logs your progress over time.

### Setup


1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
```
Edit `.env` if you need different MongoDB connection settings.


3. **Start the server**
```bash
npm start
```



## Features

- **Exercise Database**: Store and manage various exercises with categories and muscle groups
- **Custom Workouts**: Create workout routines with multiple exercises
- **Progress Tracking**: Log workout sessions with duration, calories, and ratings
- **Smart Filtering**: Query by category, difficulty, muscle group, and date ranges
- **Auto-Seeding**: Database automatically populates with sample data on first run
- **Mongoose Validation**: Built-in data validation at both application and database level


## Collections

### 1. Exercises
Stores individual exercises with detailed information.

**Fields:**
- `name` (String, required): Exercise name
- `category` (String, required): Strength, Cardio, Flexibility, or Sports
- `muscleGroup` (String, required): Target muscle group
- `equipment` (String): Required equipment
- `difficulty` (String): Beginner, Intermediate, or Advanced
- `instructions` (String): How to perform the exercise
- `caloriesPerMinute` (Number): Estimated calories burned per minute

**Indexes:**
- `category` (for filtering by type)
- `muscleGroup` (for filtering by target)
- Compound index on `category + muscleGroup` (for combined queries)

### 2. Workouts
Workout routines consisting of multiple exercises.

**Fields:**
- `name` (String, required): Workout name
- `description` (String): Workout description
- `duration` (Number, required): Total duration in minutes
- `exercises` (Array): List of exercises with sets, reps, and weight
  - `exerciseId` (ObjectId, ref to Exercise)
  - `sets`, `reps`, `weight` (Numbers)
- `difficulty` (String): Beginner, Intermediate, or Advanced
- `targetMuscles` (Array): List of target muscle groups
- `isActive` (Boolean): Whether workout is currently active

**Indexes:**
- `difficulty` (for filtering)
- `isActive` (for finding active workouts)

### 3. Progress
Log entries for completed workouts.

**Fields:**
- `workoutId` (ObjectId, required, ref to Workout)
- `date` (Date, required): When the workout was completed
- `duration` (Number, required): Actual duration in minutes (1-300)
- `caloriesBurned` (Number): Calories burned
- `notes` (String): Personal notes about the session
- `rating` (Number, required): Workout rating (1-5)
- `completed` (Boolean): Whether workout was completed

**Indexes:**
- `workoutId` (for querying by workout)
- `date` (for time-based queries)
- Compound index on `workoutId + date` (for workout history)

**Validation:**
- Rating must be between 1 and 5 (enforced by Mongoose)
- Duration must be between 1 and 300 minutes
- Notes cannot exceed 500 characters

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Setup


1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
```
Edit `.env` if you need different MongoDB connection settings.


3. **Start the server**
```bash
npm start
```

