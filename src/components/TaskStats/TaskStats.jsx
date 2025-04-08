import React from 'react';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <div>
        <p className="text-lg font-semibold">Pendientes:</p>
        <p className="text-2xl font-bold text-blue-600">{pendingTasks}</p>
      </div>
      <div>
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-2xl font-bold text-gray-700">{totalTasks}</p>
      </div>
    </div>
  );
};

export default TaskStats;


 
    
