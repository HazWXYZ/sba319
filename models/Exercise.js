const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Strength', 'Cardio', 'Flexibility', 'Sports'],
    index: true // Index for filtering by category
  },
  muscleGroup: {
    type: String,
    required: true,
    enum: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body', 'Cardio'],
    index: true // Index for filtering by muscle group
  },
  equipment: {
    type: String,
    enum: ['Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Cardio Equipment', 'Other'],
    default: 'Bodyweight'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  instructions: {
    type: String,
    default: ''
  },
  caloriesPerMinute: {
    type: Number,
    min: 0,
    default: 5
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Compound index for common queries (category + muscle group)
// This helps when filtering by both fields at once, e.g., "Strength exercises for Chest"
exerciseSchema.index({ category: 1, muscleGroup: 1 });

module.exports = mongoose.model('Exercise', exerciseSchema);
