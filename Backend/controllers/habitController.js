const habitModel = require('../models/habitModel');

exports.createHabit = (req, res) => {
    const { user_id, name, description, frequency, target } = req.body;

    if (!user_id || !name || !target) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    habitModel.createHabit(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al crear hábito' });
        }
        res.status(201).json({ message: 'Hábito creado con éxito', habitId: result.insertId });
    });
};

exports.getHabits = (req, res) => {
    const { userId } = req.params;

    habitModel.getUserHabits(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los hábitos' });
        }
        res.status(200).json({ habits: results });
    });
};

exports.updateHabit = (req, res) => {
    const { id } = req.params;
    const { name, description, frequency, progress, target } = req.body;

    habitModel.updateHabit(id, req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar hábito' });
        }
        res.status(200).json({ message: 'Hábito actualizado con éxito' });
    });
};

exports.deleteHabit = (req, res) => {
    const { id } = req.params;

    habitModel.deleteHabit(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar hábito' });
        }
        res.status(200).json({ message: 'Hábito eliminado con éxito' });
    });
};
