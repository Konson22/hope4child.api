const express = require('express');
const router = express.Router();

const { getAllChildrenController } = require('../controllers/children');

router.get('/', getAllChildrenController);

module.exports = router;