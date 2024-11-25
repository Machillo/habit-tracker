const express = require('express');
const app = express();

//Middleware
app.use(express.json());

//Ruta base
app.get('/', (req, res) => {
    res.send('Servidor corriendo!');
});

//Iniciar
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});