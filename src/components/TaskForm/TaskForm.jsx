import { useState } from 'react';

function TaskForm({ task, onSave }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...task, title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Guardar</button>
    </form>
  );
}

export default TaskForm;