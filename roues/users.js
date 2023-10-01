const express = require('express');
const router = express.Router();

const { 
    getAllUsersController, 
    registerUser, 
    createResume, 
    getFreelancersController,
    verfiyToken,
    loginUser
} = require('../controllers/users');

router.get('/', getAllUsersController);
router.post('/auth', verfiyToken);
router.post('/auth/login', loginUser);
router.post('/register', registerUser);
router.get('/freelancers', getFreelancersController);
router.post('/upload-resume', createResume);

module.exports = router;