const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, index: true }, // User's email
  title: { type: String, required: true }, // Notification title (e.g., subject)
  description: { type: String }, 
  category: { type: String }, 
  sentAt: { type: Date, default: Date.now }, 
  read: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('Notification', notificationSchema);
