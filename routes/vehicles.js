const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles');

router.get('/', vehiclesController.getAllVehicles);

router.get('/:id', vehiclesController.getSingleVehicle);

router.post('/', vehiclesController.createNewVehicle);

router.put('/:id', vehiclesController.updateCurrentVehicle);

router.delete('/:id', vehiclesController.deleteCurrentVehicle);
module.exports = router;