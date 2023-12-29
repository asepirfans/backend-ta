require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/database');
const sensorRoutes = require('./routes/sensorRoutes');
const sensorController = require('./cotrollers/sensorController'); 

const app = express();
app.use(bodyParser.json());

app.use(cors());
connectDB();

app.use('/api', sensorRoutes);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

// Tambahkan Socket.IO ke server
const io = new Server(server);

// Atur event untuk koneksi socket baru
io.on('connection', (socket) => {
  console.log('User terhubung');

  // Gunakan fungsi setSocketIoInstance untuk memberikan instance Socket.IO ke sensorController
  sensorController.setSocketIoInstance(io);
});

