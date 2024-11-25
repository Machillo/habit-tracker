import React, { useState } from 'react';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // Estado para editar hábitos
  const [editingText, setEditingText] = useState(''); // Texto del hábito en edición

  const addHabit = () => {
    if (newHabit.trim() !== '') {
      setHabits([...habits, newHabit]);
      setNewHabit('');
    }
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index)); // Elimina el hábito por índice
  };

  const editHabit = (index) => {
    setEditingIndex(index);
    setEditingText(habits[index]); // Coloca el texto del hábito actual en edición
  };

  const saveEdit = () => {
    const updatedHabits = habits.map((habit, index) =>
      index === editingIndex ? editingText : habit
    );
    setHabits(updatedHabits);
    setEditingIndex(null);
    setEditingText('');
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
                      <span>{habit}</span>
                    )}
                    <button onClick={() => deleteHabit(index)}>Eliminar</button>
                    {editingIndex !== index && (
                      <button onClick={() => editHabit(index)}>Editar</button>
                    )}
                  </li>
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
