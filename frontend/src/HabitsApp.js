import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitList from './HabitList';
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

const HabitsApp = ({ token, setToken }) => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/habits', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setHabits(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('No se pudieron cargar los hábitos. Intenta de nuevo más tarde.');
        setIsLoading(false);
      });
  }, [token]);

  const addHabit = () => {
    if (newHabit.trim() === '') return alert('El hábito no puede estar vacío.');
    axios
      .post(
        'http://localhost:5000/api/habits',
        { name: newHabit },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setHabits([...habits, response.data]);
        setNewHabit('');
      });
  };

  const deleteHabit = (id) => {
    axios
      .delete(`http://localhost:5000/api/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setHabits(habits.filter((habit) => habit._id !== id)));
  };

  const updateProgress = (id, newProgress) => {
    axios
      .put(
        `http://localhost:5000/api/habits/${id}`,
        { progress: newProgress },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setHabits(habits.map((habit) => (habit._id === id ? response.data : habit)));
      });
  };

  const chartData = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        label: 'Progreso de Hábitos',
        data: habits.map((habit) => habit.progress),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Gestión de Hábitos</h1>
        <button onClick={handleLogout}>Cerrar Sesión</button>
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
            <button onClick={addHabit}>+ Agregar Hábito</button>
          </div>
          {isLoading ? (
            <p>Cargando hábitos...</p>
          ) : (
            <HabitList habits={habits} deleteHabit={deleteHabit} updateProgress={updateProgress} />
          )}
        </section>
        {habits.length > 0 && (
          <section className="chart-section">
            <h2>Progreso de tus Hábitos</h2>
            <Bar data={chartData} options={{ responsive: true }} />
          </section>
        )}
      </main>
    </div>
  );
};

export default HabitsApp;
