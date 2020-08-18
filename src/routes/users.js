const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken')

const UserController = require('../controllers/userController');

router
    .get('/', verify, UserController.getUsers)
    .get('/:id', verify, UserController.getUser)
    .post('/', verify, UserController.saveUser)
    .delete('/del/:id', verify, UserController.deleteUser)
    .patch('/:id', verify, UserController.updateUser)

module.exports = router;