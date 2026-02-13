const express = require('express');
const router = express.Router();
const { getReports, generateReport } = require('../controllers/reportController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(protect, getReports).post(protect, generateReport);

module.exports = router;
