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
    <div className="card-container">
      {filteredTasks.map(task => (
        <div key={task.id} className="card">
          {editingTaskId === task.id ? (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border p-3 w-full rounded"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border p-3 w-full rounded"
              />
              <div className="task-actions flex justify-center gap-4 mt-2">
                <button onClick={() => handleSaveEdit(task)}>Guardar</button>
                <button onClick={() => setEditingTaskId(null)}>Cancelar</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-gradient">{task.title}</h3>
              <p className="text-center">{task.description}</p>
              <div className="task-actions flex justify-center gap-4 mt-4">
                <button
                  onClick={() => onTaskUpdate({ ...task, completed: !task.completed })}
                >
                  {task.completed ? 'Desmarcar' : 'Completa'}
                </button>
                <button onClick={() => handleEdit(task)}>Editar</button>
                <button onClick={() => onTaskDelete(task.id)}>Eliminar</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
