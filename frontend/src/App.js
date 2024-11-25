import React, { useState } from 'react';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addHabit = () => {
    if (newHabit.trim() !== '') {
      setHabits([...habits, { name: newHabit, progress: 0 }]);
      setNewHabit('');
    }
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  const editHabit = (index) => {
    setEditingIndex(index);
    setEditingText(habits[index].name);
  };

  const saveEdit = () => {
    const updatedHabits = habits.map((habit, index) =>
      index === editingIndex ? { ...habit, name: editingText } : habit
    );
    setHabits(updatedHabits);
    setEditingIndex(null);
    setEditingText('');
  };

  const updateProgress = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, progress: habit.progress + 1 } : habit
    );
    setHabits(updatedHabits);
  };

  const chartData = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        label: 'Progreso de Hábitos',
        data: habits.map((habit) => habit.progress),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Gestión de Hábitos</h1>
      </header>
      <main className="main">
        <section className="habit-list">
          <h2>Tus Hábitos</h2>
          <div className="add-habit">
            <input
              type="text"
              placeholder="Nuevo hábito"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
            />
            <button className="add-habit-button" onClick={addHabit}>
              + Agregar Hábito
            </button>
          </div>
          <div className="habits">
            {habits.length === 0 ? (
              <p>No tienes hábitos aún. ¡Comienza creando uno!</p>
            ) : (
              <ul>
                {habits.map((habit, index) => (
                  <li key={index}>
                    {editingIndex === index ? (
                      <div>
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <button onClick={saveEdit}>Guardar</button>
                      </div>
                    ) : (
                      <span>{habit.name}</span>
                    )}
                    <button onClick={() => deleteHabit(index)}>Eliminar</button>
                    {editingIndex !== index && (
                      <button onClick={() => editHabit(index)}>Editar</button>
                    )}
                    <button onClick={() => updateProgress(index)}>+1 Progreso</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        {habits.length > 0 && (
          <section className="chart-section">
            <h2>Progreso de tus Hábitos</h2>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'top' },
                  title: { display: true, text: 'Progreso de Hábitos' },
                },
              }}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
