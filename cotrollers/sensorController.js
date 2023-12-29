const Sensor = require('../models/sensorModel');
let io; // Variabel untuk menyimpan instance Socket.IO

// Perbaikan di sini
const setSocketIoInstance = (socketIoInstance) => {
  io = socketIoInstance;
};

const createSensorData = async (req, res) => {
  try {
    const keterangan = req.body.kelembapanTanah < 10 ? 'Pompa Nyala' : 'Pompa Mati';
    const dataWithKeterangan = { ...req.body, keterangan };

    const newSensorData = await Sensor.create(dataWithKeterangan);
    res.status(201).json(newSensorData);

    // Setelah membuat data sensor baru, kirim pembaruan ke semua klien
    if (io) {
      io.emit('newSensorData', newSensorData);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getLatestSensorData = async (req, res) => {
  try {
    const latestData = await Sensor.findOne().sort({ waktu: -1 });
    if (!latestData) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json(latestData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const dataSensor = await Sensor.find().sort({  waktu: 1});
    if (!dataSensor) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json(dataSensor);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}

// Perbaikan di sini
module.exports = { createSensorData, getLatestSensorData, setSocketIoInstance, getAllData };
