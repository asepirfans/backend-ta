const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    suhu: Number,
    kelembapan: Number,
    kelembapanTanah: Number,
    keterangan: String,
    waktu: { type: Date, default: Date.now }
});

const usersSchema = new mongoose.Schema({
    
})

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
