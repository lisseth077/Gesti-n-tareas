import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import TaskStats from './components/TaskStats/TaskStats';

const initialTasks = [
  {
    id: uuidv4(),
    title: "Aprender React",
    description: "Estudiar los fundamentos de React",
    completed: false,
    createdAt: new Date().toISOString()
  }
];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    } catch (error) {
      console.error("Error al cargar las tareas desde localStorage", error);
      return initialTasks;
    }
  });
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    try {
      console.log("Guardando tareas en localStorage", tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Error al guardar las tareas en localStorage", error);
    }
  }, [tasks]);

  const addOrUpdateTask = (task) => {
    setTasks(prevTasks => {
      let updatedTasks;
      if (task.id) {
        updatedTasks = prevTasks.map(t => t.id === task.id ? task : t);
      } else {
        updatedTasks = [...prevTasks, { ...task, id: uuidv4(), completed: false, createdAt: new Date().toISOString() }];
      }
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const updateTask = (updatedTask) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Lista de Tareas</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <TaskForm task={editingTask} onSave={addOrUpdateTask} onCancel={() => setEditingTask(null)} />
        <TaskFilter filter={filter} onFilterChange={setFilter} />
        <TaskStats tasks={tasks} />
        <TaskList tasks={tasks} filter={filter} onTaskUpdate={updateTask} onTaskDelete={deleteTask} />
      </div>
    </div>
  );
}

export default App;