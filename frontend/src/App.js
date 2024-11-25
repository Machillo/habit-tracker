import React, { useState } from 'react';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]); // Almacenar hábitos
  const [newHabit, setNewHabit] = useState(''); // Nuevo hábito

  const addHabit = () => {
    if (newHabit.trim() !== '') {
      setHabits([...habits, newHabit]); // Agrega el hábito al estado
      setNewHabit(''); // Limpia el campo
    }
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
                  <li key={index}>{habit}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
