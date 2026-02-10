const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Exercise = require('./models/Exercise');
const Workout = require('./models/Workout');
const Progress = require('./models/Progress');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ========== EXERCISE ROUTES ==========

// GET all exercises (with optional filters)
app.get('/api/exercises', async (req, res) => {
  try {
    const { category, muscleGroup, difficulty } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (muscleGroup) filter.muscleGroup = muscleGroup;
    if (difficulty) filter.difficulty = difficulty;
    
    const exercises = await Exercise.find(filter).sort({ name: 1 });
    res.json({ success: true, count: exercises.length, data: exercises });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single exercise
app.get('/api/exercises/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    
    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found' });
    }
    
    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST new exercise
app.post('/api/exercises', async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json({ success: true, data: exercise });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PATCH update exercise
app.patch('/api/exercises/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found' });
    }
    
    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE exercise
app.delete('/api/exercises/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    
    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found' });
    }
    
    res.json({ success: true, message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== WORKOUT ROUTES ==========

// GET all workouts
app.get('/api/workouts', async (req, res) => {
  try {
    const { difficulty, isActive } = req.query;
    
    let filter = {};
    if (difficulty) filter.difficulty = difficulty;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    const workouts = await Workout.find(filter)
      .populate('exercises.exerciseId', 'name category')
      .sort({ name: 1 });
    
    res.json({ success: true, count: workouts.length, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single workout
app.get('/api/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('exercises.exerciseId');
    
    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }
    
    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST new workout
app.post('/api/workouts', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PATCH update workout
app.patch('/api/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }
    
    res.json({ success: true, data: workout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE workout
app.delete('/api/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    
    if (!workout) {
      return res.status(404).json({ success: false, error: 'Workout not found' });
    }
    
    res.json({ success: true, message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== PROGRESS ROUTES ==========

// GET all progress logs
app.get('/api/progress', async (req, res) => {
  try {
    const { workoutId, startDate, endDate } = req.query;
    
    let filter = {};
    if (workoutId) filter.workoutId = workoutId;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    const progress = await Progress.find(filter)
      .populate('workoutId', 'name difficulty')
      .sort({ date: -1 });
    
    res.json({ success: true, count: progress.length, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single progress log
app.get('/api/progress/:id', async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id)
      .populate('workoutId');
    
    if (!progress) {
      return res.status(404).json({ success: false, error: 'Progress log not found' });
    }
    
    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST new progress log
app.post('/api/progress', async (req, res) => {
  try {
    const progress = await Progress.create(req.body);
    res.status(201).json({ success: true, data: progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PATCH update progress log
app.patch('/api/progress/:id', async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!progress) {
      return res.status(404).json({ success: false, error: 'Progress log not found' });
    }
    
    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE progress log
app.delete('/api/progress/:id', async (req, res) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);
    
    if (!progress) {
      return res.status(404).json({ success: false, error: 'Progress log not found' });
    }
    
    res.json({ success: true, message: 'Progress log deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== VALIDATION TEST ROUTE ==========

// POST route to test validation - this should fail
app.post('/api/progress/test-validation', async (req, res) => {
  try {
    // This should fail because rating is outside 1-5 range
    const invalidProgress = await Progress.create({
      workoutId: new mongoose.Types.ObjectId(),
      duration: 30,
      rating: 10, // Invalid - should be 1-5
      caloriesBurned: 200
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'WARNING: Validation should have prevented this!',
      data: invalidProgress 
    });
  } catch (error) {
    // This is the expected path - validation error
    res.status(400).json({ 
      success: false, 
      error: 'Validation failed (as expected): ' + error.message 
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Workout Tracker API',
    version: '1.0',
    endpoints: {
      exercises: '/api/exercises',
      workouts: '/api/workouts',
      progress: '/api/progress'
    }
  });
});

// ========== AUTO-SEED DATABASE ==========

async function seedDatabase() {
  try {
    // Check if data already exists
    const exerciseCount = await Exercise.countDocuments();
    
    if (exerciseCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }
    
    console.log('Seeding database with sample data...');
    
    // Create exercises
    const exercises = await Exercise.insertMany([
      { name: 'Bench Press', category: 'Strength', muscleGroup: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate', instructions: 'Lie on bench, lower bar to chest, press up', caloriesPerMinute: 8 },
      { name: 'Squats', category: 'Strength', muscleGroup: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate', instructions: 'Lower hips, keep back straight, drive through heels', caloriesPerMinute: 10 },
      { name: 'Deadlift', category: 'Strength', muscleGroup: 'Back', equipment: 'Barbell', difficulty: 'Advanced', instructions: 'Lift bar from ground, keep back neutral', caloriesPerMinute: 12 },
      { name: 'Pull-ups', category: 'Strength', muscleGroup: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate', instructions: 'Hang from bar, pull up until chin over bar', caloriesPerMinute: 9 },
      { name: 'Push-ups', category: 'Strength', muscleGroup: 'Chest', equipment: 'Bodyweight', difficulty: 'Beginner', instructions: 'Lower body, keep core tight, push up', caloriesPerMinute: 7 },
      { name: 'Running', category: 'Cardio', muscleGroup: 'Cardio', equipment: 'Cardio Equipment', difficulty: 'Beginner', instructions: 'Maintain steady pace, focus on breathing', caloriesPerMinute: 10 },
      { name: 'Plank', category: 'Strength', muscleGroup: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner', instructions: 'Hold body straight in push-up position', caloriesPerMinute: 5 },
      { name: 'Dumbbell Rows', category: 'Strength', muscleGroup: 'Back', equipment: 'Dumbbell', difficulty: 'Beginner', instructions: 'Bend at waist, pull dumbbell to hip', caloriesPerMinute: 7 },
      { name: 'Shoulder Press', category: 'Strength', muscleGroup: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner', instructions: 'Press dumbbells overhead from shoulders', caloriesPerMinute: 6 },
      { name: 'Lunges', category: 'Strength', muscleGroup: 'Legs', equipment: 'Bodyweight', difficulty: 'Beginner', instructions: 'Step forward, lower hips, return to start', caloriesPerMinute: 8 }
    ]);
    
    // Create workouts
    const workouts = await Workout.insertMany([
      {
        name: 'Full Body Beginner',
        description: 'A complete full body workout for beginners',
        duration: 45,
        difficulty: 'Beginner',
        targetMuscles: ['Chest', 'Back', 'Legs', 'Core'],
        exercises: [
          { exerciseId: exercises[4]._id, sets: 3, reps: 10, weight: 0 }, // Push-ups
          { exerciseId: exercises[7]._id, sets: 3, reps: 12, weight: 20 }, // Dumbbell Rows
          { exerciseId: exercises[9]._id, sets: 3, reps: 10, weight: 0 }, // Lunges
          { exerciseId: exercises[6]._id, sets: 3, reps: 30, weight: 0 }  // Plank (30 sec holds)
        ]
      },
      {
        name: 'Upper Body Strength',
        description: 'Intense upper body workout',
        duration: 60,
        difficulty: 'Intermediate',
        targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms'],
        exercises: [
          { exerciseId: exercises[0]._id, sets: 4, reps: 8, weight: 135 }, // Bench Press
          { exerciseId: exercises[3]._id, sets: 4, reps: 8, weight: 0 },   // Pull-ups
          { exerciseId: exercises[8]._id, sets: 3, reps: 10, weight: 30 }, // Shoulder Press
          { exerciseId: exercises[7]._id, sets: 3, reps: 12, weight: 35 }  // Dumbbell Rows
        ]
      },
      {
        name: 'Leg Day',
        description: 'Heavy leg workout',
        duration: 50,
        difficulty: 'Intermediate',
        targetMuscles: ['Legs'],
        exercises: [
          { exerciseId: exercises[1]._id, sets: 5, reps: 5, weight: 185 }, // Squats
          { exerciseId: exercises[2]._id, sets: 5, reps: 5, weight: 225 }, // Deadlift
          { exerciseId: exercises[9]._id, sets: 3, reps: 12, weight: 0 }   // Lunges
        ]
      },
      {
        name: 'Quick Cardio',
        description: '30 minute cardio session',
        duration: 30,
        difficulty: 'Beginner',
        targetMuscles: ['Full Body'],
        exercises: [
          { exerciseId: exercises[5]._id, sets: 1, reps: 30, weight: 0 }  // Running (30 min)
        ]
      },
      {
        name: 'Core Blaster',
        description: 'Core focused workout',
        duration: 20,
        difficulty: 'Beginner',
        targetMuscles: ['Core'],
        exercises: [
          { exerciseId: exercises[6]._id, sets: 4, reps: 60, weight: 0 }, // Plank
          { exerciseId: exercises[4]._id, sets: 3, reps: 15, weight: 0 }  // Push-ups
        ]
      }
    ]);
    
    // Create progress logs
    await Progress.insertMany([
      { workoutId: workouts[0]._id, date: new Date('2024-01-15'), duration: 45, caloriesBurned: 320, rating: 4, notes: 'Felt good, push-ups getting easier' },
      { workoutId: workouts[0]._id, date: new Date('2024-01-18'), duration: 42, caloriesBurned: 310, rating: 5, notes: 'Great workout!' },
      { workoutId: workouts[1]._id, date: new Date('2024-01-16'), duration: 65, caloriesBurned: 450, rating: 4, notes: 'Tough but good' },
      { workoutId: workouts[2]._id, date: new Date('2024-01-17'), duration: 55, caloriesBurned: 500, rating: 5, notes: 'New PR on squats!' },
      { workoutId: workouts[3]._id, date: new Date('2024-01-19'), duration: 30, caloriesBurned: 300, rating: 3, notes: 'Tired today' },
      { workoutId: workouts[4]._id, date: new Date('2024-01-20'), duration: 20, caloriesBurned: 150, rating: 4, notes: 'Core is sore!' },
      { workoutId: workouts[0]._id, date: new Date('2024-01-22'), duration: 45, caloriesBurned: 330, rating: 5, notes: 'Increasing reps next time' },
      { workoutId: workouts[1]._id, date: new Date('2024-01-23'), duration: 60, caloriesBurned: 440, rating: 4, notes: 'Good pump' },
      { workoutId: workouts[2]._id, date: new Date('2024-01-24'), duration: 50, caloriesBurned: 480, rating: 5, notes: 'Feeling strong' },
      { workoutId: workouts[3]._id, date: new Date('2024-01-26'), duration: 32, caloriesBurned: 320, rating: 4, notes: 'Good cardio session' }
    ]);
    
    console.log('✅ Database seeded successfully!');
    console.log('Sample data: 10 exercises, 5 workouts, 10 progress logs');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// ========== START SERVER ==========

async function startServer() {
  try {
    // Connect to MongoDB
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/workout-tracker';
    await mongoose.connect(dbUri);
    console.log('✅ Connected to MongoDB');
    
    // Seed database on first run
    await seedDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Visit http://localhost:${PORT}/api/exercises to see data`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
