import { useState, useEffect, useRef } from 'react';

function TaskForm({ task, onSave }) {
  const minTitleLength = 5;
  const maxTitleLength = 10;
  const minDescriptionLength = 5;
  const maxDescriptionLength = 50;

  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  useEffect(() => {
    if (!task && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Por favor, ingrese un título y una descripción.');
      return;
    }

    if (title.length < minTitleLength || description.length < minDescriptionLength) {
      alert(`El título debe tener al menos ${minTitleLength} caracteres y la descripción al menos ${minDescriptionLength}.`);
      return;
    }

    if (title.length > maxTitleLength) {
      alert(`El título no debe superar los ${maxTitleLength} caracteres.`);
      return;
    }

    if (description.length > maxDescriptionLength) {
      alert(`La descripción no debe superar los ${maxDescriptionLength} caracteres.`);
      return;
    }

    const allowedCharsRegex = /^[a-zA-Z0-9\s.,!?]*$/;

    if (!allowedCharsRegex.test(title) || !allowedCharsRegex.test(description)) {
      alert('Por favor, evite caracteres especiales en el título y la descripción.');
      return;
    }

    onSave({ ...task, title, description });
    setTitle('');
    setDescription('');
  };

  const handleTitleChange = (e) => {
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      descriptionInputRef.current.focus();
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= maxDescriptionLength) {
      setDescription(e.target.value);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder={`Título (Min ${minTitleLength}, Max ${maxTitleLength})`}
          className="border p-2 mb-2 w-full"
          ref={titleInputRef}
          onKeyDown={handleTitleChange}
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder={`Descripción (Min ${minDescriptionLength}, Max ${maxDescriptionLength})`}
          className="border p-2 mb-2 w-full"
          ref={descriptionInputRef}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
