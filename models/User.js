const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  preferences: {
    categories: {
      type: [String],
      enum: ['politics', 'sports', 'technology', 'business', 'health', 'entertainment'],
      default: ['politics', 'sports', 'technology'],
    },
    frequency: { type: String, enum: ['immediate', 'hourly', 'daily'], default: 'immediate' },
    notificationTypes: { type: [String], enum: ['email'], default: ['email'] }, // Extendable for SMS, Push
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
