const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  preferences: {
    categories: [String],
    frequency: { type: String, enum: ['immediate', 'hourly', 'daily'], default: 'immediate' },
    notificationType: { type: String, enum: ['email', 'sms', 'push'], default: 'email' },
  },
});

module.exports = mongoose.model('User', UserSchema);
