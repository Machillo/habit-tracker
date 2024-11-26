const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const habitRoutes = require('./routes/habits');
const app = express();
const authRoutes = require('./routes/auth');


app.use(cors());
app.use(express.json());
app.use('/api/habits', habitRoutes);
app.use('/api/auth', authRoutes);

mongoose
  .connect('mongodb://127.0.0.1:27017/habit_tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));


app.get('/', (req, res) => {
  res.send('Servidor corriendo...');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
