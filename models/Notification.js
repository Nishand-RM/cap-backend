// backend/models/Notification.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, index: true }, // User's email
  title: { type: String, required: true }, // Notification title (e.g., subject)
  description: { type: String }, // Brief description of the notification
  category: { type: String }, // Categories included in the notification
  url: { type: String }, // Optional URL related to the notification
  sentAt: { type: Date, default: Date.now }, // Timestamp when the notification was sent
  read: { type: Boolean, default: false }, // Whether the notification has been read
});

module.exports = mongoose.model('Notification', notificationSchema);
