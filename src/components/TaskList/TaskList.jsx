import React, { useState } from 'react';

function TaskList({ tasks, filter, onTaskUpdate, onTaskDelete }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = (task) => {
    onTaskUpdate({ ...task, title: editedTitle, description: editedDescription });
    setEditingTaskId(null);
  };

  return (
    <div>
      {filteredTasks.map(task => (
        <div key={task.id} className="border p-2 mb-2">
          {editingTaskId === task.id ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border p-1 mb-1 w-full"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border p-1 mb-1 w-full"
              />
              <button
                onClick={() => handleSaveEdit(task)}
                className="bg-blue-500 text-white p-1 rounded mr-2"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingTaskId(null)}
                className="bg-gray-300 p-1 rounded"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button
                onClick={() => onTaskUpdate({ ...task, completed: !task.completed })}
                className="bg-green-500 text-white p-1 rounded mr-2"
              >
                {task.completed ? 'Desmarcar' : 'Completar'}
              </button>
              <button
                onClick={() => handleEdit(task)}
                className="bg-blue-500 text-white p-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onTaskDelete(task.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;