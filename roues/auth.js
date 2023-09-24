const express = require('express');
const { loginUser, registerUser, verfiyToken } = require('../controllers/auth');

const router = express.Router();


router.post('/', verfiyToken);
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router