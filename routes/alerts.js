const express = require('express');
const router = express.Router();
const { createUser, sendAlerts } = require('../controllers/alertController');

router.post('/subscribe', createUser);
router.post('/send', sendAlerts);

module.exports = router;
