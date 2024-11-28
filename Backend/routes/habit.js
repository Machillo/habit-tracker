const express = require('express');
const { createHabit, getHabits, updateHabit, deleteHabit } = require('../controllers/habitController');
const router = express.Router();

router.post('/', createHabit);
router.get('/:userId', getHabits);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

module.exports = router;
