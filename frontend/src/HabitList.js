import React from 'react';

const HabitList = ({ habits, deleteHabit, updateProgress }) => (
  <ul>
    {habits.map((habit) => (
      <li key={habit._id}>
        <span>{habit.name}</span>
        <button onClick={() => deleteHabit(habit._id)}>Eliminar</button>
        <button onClick={() => updateProgress(habit._id, habit.progress + 1)}>
          +1 Progreso
        </button>
      </li>
    ))}
  </ul>
);

export default HabitList;
