const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getSingleUser);

router.post('/', usersController.createNewUser);

router.put('/:id', usersController.updateCurrentUser);

router.delete('/:id', usersController.deleteCurrentUser);
module.exports = router;