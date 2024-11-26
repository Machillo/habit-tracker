import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
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
import HabitList from './HabitList';
import Login from './Login';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Efecto para cargar los hábitos desde el backend
  useEffect(() => {
    if (!token) return; // No cargar si no hay token

    axios
      .get('http://localhost:5000/api/habits', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setHabits(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los hábitos:', error);
        setError('No se pudieron cargar los hábitos. Intenta de nuevo más tarde.');
        setIsLoading(false);
      });
  }, [token]);

  // Función para agregar un nuevo hábito
  const addHabit = () => {
    if (newHabit.trim() === '') {
      alert('El hábito no puede estar vacío.');
      return;
    }

    if (habits.some((habit) => habit.name.toLowerCase() === newHabit.toLowerCase())) {
      alert('Este hábito ya existe.');
      return;
    }

    axios
      .post(
        'http://localhost:5000/api/habits',
        { name: newHabit },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setHabits([...habits, response.data]); // Agregar el nuevo hábito al estado
        setNewHabit('');
      })
      .catch((error) => {
        console.error('Error al agregar el hábito:', error);
      });
  };

  // Función para eliminar un hábito
  const deleteHabit = (id) => {
    axios
      .delete(`http://localhost:5000/api/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setHabits(habits.filter((habit) => habit._id !== id)); // Eliminar el hábito del estado
      })
      .catch((error) => {
        console.error('Error al eliminar el hábito:', error);
      });
  };

  // Función para actualizar el progreso de un hábito
  const updateProgress = (id, newProgress) => {
    axios
      .put(
        `http://localhost:5000/api/habits/${id}`,
        { progress: newProgress },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const updatedHabits = habits.map((habit) =>
          habit._id === id ? response.data : habit
        );
        setHabits(updatedHabits);
      })
      .catch((error) => {
        console.error('Error al actualizar el progreso:', error);
      });
  };

  // Datos para la gráfica
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

  // Si no hay token, mostrar el formulario de inicio de sesión
  if (!token) {
    return <Login setToken={setToken} />;
  }

  // Renderización principal
  return (
    <div className="app">
      <header className="header">
        <h1>Gestión de Hábitos</h1>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
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
          {error && <p className="error-message">{error}</p>}
          <div className="habits">
            {isLoading ? (
              <p>Cargando hábitos...</p>
            ) : habits.length === 0 ? (
              <p>No tienes hábitos aún. ¡Comienza creando uno!</p>
            ) : (
              <HabitList
                habits={habits}
                deleteHabit={deleteHabit}
                updateProgress={updateProgress}
              />
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
