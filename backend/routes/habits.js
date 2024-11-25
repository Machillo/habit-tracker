const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Obtener todos los hábitos
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los hábitos' });
  }
});

// Crear un nuevo hábito
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newHabit = new Habit({ name });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el hábito' });
  }
});

// Actualizar el progreso de un hábito
router.put('/:id', async (req, res) => {
  const { progress } = req.body;
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true }
    );
    res.json(updatedHabit);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar el hábito' });
  }
});

// Eliminar un hábito
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hábito eliminado' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar el hábito' });
  }
});

module.exports = router;
