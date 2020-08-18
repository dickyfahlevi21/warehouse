const express = require('express');
const router = express.Router();

const jwtController = require('../controllers/jwtController')

router.post('/login', jwtController.login);
router.post('/register', jwtController.register);

module.exports = router;