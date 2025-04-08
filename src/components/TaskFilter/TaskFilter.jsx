import React from 'react';

const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="buttons-container gap-4 mt-4 mb-6">
      <button
        className={`filter-button ${
          filter === 'all' ? 'bg-purple-500 text-white' : ''
        }`}
        onClick={() => onFilterChange('all')}
      >
        🗒️ Todas
      </button>
      <button
        className={`filter-button ${
          filter === 'active' ? 'bg-purple-500 text-white' : ''
        }`}
        onClick={() => onFilterChange('active')}
      >
        🌀 Activas
      </button>
      <button
        className={`filter-button ${
          filter === 'completed' ? 'bg-purple-500 text-white' : ''
        }`}
        onClick={() => onFilterChange('completed')}
      >
        ✅ Completadas
      </button>
    </div>
  );
};

export default TaskFilter;

