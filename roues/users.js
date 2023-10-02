const express = require('express');
const router = express.Router();

const { 
    getAllUsersController, 
    registerUser, 
    createResume, 
    getFreelancersController,
    authUser,
    loginUser
} = require('../controllers/users');
const { verifyToken } = require('../midlewares/jwt');

router.get('/', getAllUsersController);
router.post('/auth', verifyToken, authUser);
router.post('/auth/login', loginUser);
router.post('/register', registerUser);
router.get('/freelancers', getFreelancersController);
router.post('/upload-resume', createResume);

module.exports = router;