// backend/routes/news.js

const express = require('express');
const router = express.Router();
const { getNews, manualSendAlerts, getNotifications } = require('../controllers/newsController');

// Get latest news
router.get('/', getNews);

// Manually trigger sending alerts (optional)
router.post('/alerts', manualSendAlerts);

// Get notifications for a user
router.get('/notifications', getNotifications);

module.exports = router;
