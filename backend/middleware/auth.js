const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'kenneth.d.alvarado@gmail.com', 
    pass: 'PassApp.12', 
  },
});

router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'El usuario ya está registrado.' });
  }

  const verificationCode = crypto.randomBytes(3).toString('hex');

  try {
    await transporter.sendMail({
      from: 'kenneth.d.alvarado@gmail.com', 
      to: email,
      subject: 'Código de Verificación - Habit Tracker',
      text: `Tu código de verificación es: ${verificationCode}`,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error al enviar el correo.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    verificationCode,
    isVerified: false,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: 'Usuario registrado. Por favor, verifica tu correo.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
});

router.post('/verify', async (req, res) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Usuario no encontrado.' });
  }

  if (user.verificationCode !== verificationCode) {
    return res.status(400).json({ error: 'Código de verificación incorrecto.' });
  }

  user.isVerified = true;
  user.verificationCode = undefined; 

  try {
    await user.save();
    res.status(200).json({ message: 'Usuario verificado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar el usuario.' });
  }
});

module.exports = router;
