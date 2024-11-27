const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET_KEY = 'TlpeCqmFgD.303412';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ error: 'El usuario ya existe' });

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ error: 'Credenciales incorrectas' });
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ error: 'Credenciales incorrectas' });
  
      // Generar token
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  });
  
  module.exports = router;