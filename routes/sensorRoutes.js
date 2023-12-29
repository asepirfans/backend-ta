const express = require('express');
const sensorController = require('../cotrollers/sensorController');
const router = express.Router();

router.post('/sensor', sensorController.createSensorData);
router.get('/sensor', sensorController.getLatestSensorData);
router.get('/sensors', sensorController.getAllData);

router.handleSocketIo = (io) => {
    sensorController.setSocketIoInstance(io);
  };

module.exports = router;