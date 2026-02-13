const express = require('express');
const router = express.Router();
const { getLogs, createOrUpdateLog } = require('../controllers/logController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(protect, getLogs).post(protect, createOrUpdateLog);

module.exports = router;
