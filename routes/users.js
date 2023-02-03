const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getSingleUser);

router.post('/', usersController.createNewUser);

//router.put('/:id', contactsController.updateCurrentContact);

//router.delete('/:id', contactsController.deleteCurrentContact);
module.exports = router;