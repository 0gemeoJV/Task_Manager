// AddTask.jsx
import React, { useState } from 'react';
import './styles/AddTask.css'

const AddTask = ({ onAddTask }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState(''); 

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTaskTitle.trim() === '') {
      return;
    }

    onAddTask(newTaskTitle, newTaskDescription);

    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsAdding(false); 
  };

  
  if (isAdding) {
    return (
      <div className="add-task-form-container">
        <form onSubmit={handleSubmit} className="add-task-form">
          <input
            type="text"
            className="task-input"
            placeholder="Digite o título da nova tarefa..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="task-description-input"
            placeholder="Digite a descrição da tarefa (opcional)..."
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            rows="3"
          />
          <div className="form-actions">
            <button type="submit" className="submit-task-button">
              Adicionar
            </button>
            <button 
              type="button" 
              className="cancel-task-button" 
              onClick={() => {
                setIsAdding(false);
                setNewTaskTitle('');
                setNewTaskDescription(''); 
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="add-task-container">
      <button className="add-task-button" onClick={handleAddClick}>
        + Add Task
      </button>
    </div>
  );
};

export default AddTask;