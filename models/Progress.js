const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: [true, 'Workout ID is required'],
    index: true // Index for querying by workout
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    index: true // Index for sorting/filtering by date
  },
  duration: {
    type: Number, // actual duration in minutes
    required: true,
    min: [1, 'Duration must be at least 1 minute'],
    max: [300, 'Duration cannot exceed 300 minutes']
  },
  caloriesBurned: {
    type: Number,
    min: 0,
    default: 0
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    default: ''
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5'],
    required: [true, 'Rating is required']
  },
  completed: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for querying progress by workout and date
progressSchema.index({ workoutId: 1, date: -1 });

module.exports = mongoose.model('Progress', progressSchema);
