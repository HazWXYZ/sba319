const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workout name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: [1, 'Duration must be at least 1 minute']
  },
  exercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: {
      type: Number,
      default: 3,
      min: 1
    },
    reps: {
      type: Number,
      default: 10,
      min: 1
    },
    weight: {
      type: Number, // in lbs
      default: 0,
      min: 0
    }
  }],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
    index: true
  },
  targetMuscles: [{
    type: String,
    enum: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for finding active workouts
workoutSchema.index({ isActive: 1 });

module.exports = mongoose.model('Workout', workoutSchema);
