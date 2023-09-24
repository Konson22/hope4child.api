const express = require('express');
const router = express.Router();

const { getAllUsersController } = require('../controllers/users');

router.get('/', getAllUsersController);

module.exports = router;