const express = require('express');
const router = express.Router();
const { getNews, manualSendAlerts, getNotifications } = require('../controllers/newsController');

// Get latest news
router.get('/', getNews);


router.post('/alerts', manualSendAlerts);


router.get('/notifications', getNotifications);

module.exports = router;
