const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Berhasil terkoneksi ke MongoDB');
  } catch (error) {
    console.error('Gagal terkoneksi ke MongoDB:', error.message);
    process.exit(1); // Keluar dari aplikasi jika koneksi gagal
  }
};

module.exports = connectDB;
