const express = require('express');
const router = express.Router();
const usersController = require('../controllers/vehicles');

router.get('/', usersController.getAllVehicles);

router.get('/:id', usersController.getSingleVehicle);

router.post('/', usersController.createNewVehicle);

//router.put('/:id', contactsController.updateCurrentContact);

//router.delete('/:id', contactsController.deleteCurrentContact);
module.exports = router;