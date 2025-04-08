import React, { useState } from 'react';

const TaskItem = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleCheckboxChange = (e) => {
    onTaskUpdate({ ...task, completed: e.target.checked });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onTaskUpdate({ ...task, text: editedText });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onTaskDelete(task.id);
  };

  return (
    <li className="flex items-center justify-between p-2 border rounded">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="flex-grow p-1 border rounded mr-2"
        />
      ) : (
        <div className="flex items-center flex-grow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span className={task.completed ? 'line-through' : ''}>
            {task.text}
          </span>
        </div>
      )}
      <div>
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded mr-1"
          >
            Editar
          </button>
        )}
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default TaskItem;