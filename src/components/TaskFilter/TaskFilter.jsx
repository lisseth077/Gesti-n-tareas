import React from 'react';

const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      <button
        className={`px-4 py-2 rounded ${
          filter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('all')}
      >
        Todas
      </button>
      <button
        className={`px-4 py-2 rounded ${
          filter === 'active'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('active')}
      >
        Activas
      </button>
      <button
        className={`px-4 py-2 rounded ${
          filter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('completed')}
      >
        Completadas
      </button>
    </div>
  );
};

export default TaskFilter;