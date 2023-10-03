const express = require('express');
const router = express.Router();

const { createResume, getSingleResume, getAllResumiesController } = require('../controllers/resumeController');
const { verifyToken } = require('../midlewares/jwt');

router.get('/', getAllResumiesController);
router.get('/single', getSingleResume);
router.post('/upload', verifyToken, createResume);

module.exports = router;