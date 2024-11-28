const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.registerUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        }
    );
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al buscar usuario' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    });
};
