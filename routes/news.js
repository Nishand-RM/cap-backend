// backend/routes/news.js

const express = require('express');
const router = express.Router();
const { getNews, manualSendAlerts } = require('../controllers/newsController');

// Get latest news
router.get('/', getNews);

// Manually trigger sending alerts (optional)
router.post('/alerts', manualSendAlerts);

module.exports = router;
