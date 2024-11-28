const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const habitRoutes = require('./routes/habit');
app.use('/habits', habitRoutes);

const app = express();
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
