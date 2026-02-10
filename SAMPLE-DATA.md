# Sample Data Structure

This file shows what the data looks like in the database. The actual MongoDB database will have ObjectIds instead of the placeholder IDs shown here.

## Exercises Collection (10 documents)

```json
[
  {
    "_id": "ObjectId(auto-generated)",
    "name": "Bench Press",
    "category": "Strength",
    "muscleGroup": "Chest",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Lie on bench, lower bar to chest, press up",
    "caloriesPerMinute": 8,
    "createdAt": "2024-01-XX",
    "updatedAt": "2024-01-XX"
  },
  {
    "_id": "ObjectId(auto-generated)",
    "name": "Squats",
    "category": "Strength",
    "muscleGroup": "Legs",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Lower hips, keep back straight, drive through heels",
    "caloriesPerMinute": 10,
    "createdAt": "2024-01-XX",
    "updatedAt": "2024-01-XX"
  },
  {
    "_id": "ObjectId(auto-generated)",
    "name": "Deadlift",
    "category": "Strength",
    "muscleGroup": "Back",
    "equipment": "Barbell",
    "difficulty": "Advanced",
    "instructions": "Lift bar from ground, keep back neutral",
    "caloriesPerMinute": 12,
    "createdAt": "2024-01-XX",
    "updatedAt": "2024-01-XX"
  },
  {
    "_id": "ObjectId(auto-generated)",
    "name": "Pull-ups",
    "category": "Strength",
    "muscleGroup": "Back",
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Hang from bar, pull up until chin over bar",
    "caloriesPerMinute": 9,
    "createdAt": "2024-01-XX",
    "updatedAt": "2024-01-XX"
  },
  {
    "_id": "ObjectId(auto-generated)",
    "name": "Push-ups",
    "category": "Strength",
    "muscleGroup": "Chest",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Lower body, keep core tight, push up",
    "caloriesPerMinute": 7,
    "createdAt": "2024-01-XX",
    "updatedAt": "2024-01-XX"
  }
  // ... 5 more exercises (Running, Plank, Dumbbell Rows, Shoulder Press, Lunges)
]
```

## Workouts Collection (5 documents)

```json
[
  {
    "_id": "ObjectId(auto-generated)",
    "name": "Full Body Beginner",
    "description": "A complete full body workout for beginners",
    "duration": 45,
    "difficulty": "Beginner",
    "targetMuscles": ["Chest", "Back", "Legs", "Core"],
    "isActive": true,
    "exercises": [
      {
        "exerciseId": "ObjectId(references Push-ups)",
        "sets": 3,
        "reps": 10,
        "weight": 0
      },
      {
        "exerciseId": "ObjectId(references Dumbbell Rows)",
        "sets": 3,
        "reps": 12,
        "weight": 20
      },
      {
        "exerciseId": "ObjectId(references Lunges)",
        "sets": 3,
        "reps": 10,
        "weight": 0
      },
      {
        "exerciseId": "ObjectId(references Plank)",
        "sets": 3,
        "reps": 30,
        "weight": 0
      }
    ],
    "createdAt": "2024-01-XX",
    "updatedAt": "2024-01-XX"
  },
  {
    "_id": "ObjectId(auto-generated)",
    "name": "Upper Body Strength",
    "description": "Intense upper body workout",
    "duration": 60,
    "difficulty": "Intermediate",
    "targetMuscles": ["Chest", "Back", "Shoulders", "Arms"],
    "isActive": true,
    "exercises": [
      {
        "exerciseId": "ObjectId(references Bench Press)",
        "sets": 4,
        "reps": 8,
        "weight": 135
      },
      {
        "exerciseId": "ObjectId(references Pull-ups)",
        "sets": 4,
        "reps": 8,
        "weight": 0
      }
      // ... more exercises
    ],
    "createdAt": "2024-01-XX",
    "updatedAt": "2024-01-XX"
  }
  // ... 3 more workouts (Leg Day, Quick Cardio, Core Blaster)
]
```

## Progress Collection (10 documents)

```json
[
  {
    "_id": "ObjectId(auto-generated)",
    "workoutId": "ObjectId(references Full Body Beginner)",
    "date": "2024-01-15T00:00:00.000Z",
    "duration": 45,
    "caloriesBurned": 320,
    "rating": 4,
    "notes": "Felt good, push-ups getting easier",
    "completed": true,
    "createdAt": "2024-01-15",
    "updatedAt": "2024-01-15"
  },
  {
    "_id": "ObjectId(auto-generated)",
    "workoutId": "ObjectId(references Full Body Beginner)",
    "date": "2024-01-18T00:00:00.000Z",
    "duration": 42,
    "caloriesBurned": 310,
    "rating": 5,
    "notes": "Great workout!",
    "completed": true,
    "createdAt": "2024-01-18",
    "updatedAt": "2024-01-18"
  },
  {
    "_id": "ObjectId(auto-generated)",
    "workoutId": "ObjectId(references Upper Body Strength)",
    "date": "2024-01-16T00:00:00.000Z",
    "duration": 65,
    "caloriesBurned": 450,
    "rating": 4,
    "notes": "Tough but good",
    "completed": true,
    "createdAt": "2024-01-16",
    "updatedAt": "2024-01-16"
  }
  // ... 7 more progress logs
]
```

## Indexes

### Exercises
- `category` (ascending) - for filtering by exercise type
- `muscleGroup` (ascending) - for filtering by target muscle
- `category + muscleGroup` (compound) - for combined queries

### Workouts
- `difficulty` (ascending) - for filtering by difficulty level
- `isActive` (ascending) - for finding active workouts

### Progress
- `workoutId` (ascending) - for finding all logs for a workout
- `date` (ascending) - for time-based queries
- `workoutId + date` (compound) - for workout history queries

## Mongoose Validation Rules

### Progress Collection
- `workoutId`: Must be ObjectId (required)
- `date`: Must be Date (required)
- `duration`: Must be number 1-300 (required)
- `caloriesBurned`: Must be number ≥ 0
- `notes`: Max 500 characters
- `rating`: Must be integer 1-5 (required) ⚠️ VALIDATED
- `completed`: Must be boolean

### Exercise Collection
- `name`: Required string
- `category`: Must be one of: Strength, Cardio, Flexibility, Sports
- `muscleGroup`: Must be valid muscle group enum
- `difficulty`: Must be Beginner, Intermediate, or Advanced

### Workout Collection
- `name`: Required string
- `duration`: Required number ≥ 1
- `exercises.sets`: Must be ≥ 1
- `exercises.reps`: Must be ≥ 1
- `exercises.weight`: Must be ≥ 0
