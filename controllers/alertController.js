const User = require('../models/User');
const { sendEmail } = require('../services/emailService');

exports.createUser = async (req, res) => {
  const { email, preferences } = req.body;
  const user = new User({ email, preferences });
  await user.save();
  res.status(201).json({ message: 'User subscribed successfully!' });
};

exports.sendAlerts = async (req, res) => {
  const { category, message } = req.body;
  const users = await User.find({ 'preferences.categories': category });
  users.forEach(user => sendEmail(user.email, message));
  res.status(200).json({ message: 'Alerts sent!' });
};
