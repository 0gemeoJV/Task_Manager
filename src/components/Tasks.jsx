// Tasks.jsx
import React, { useState } from 'react';
import AddMember from './AddMember';
import './styles/Tasks.css';


const Tasks = ({ title, description, members, status, taskId, onAddMember, onStatusChange, onDeleteTask, onTaskEdit }) => {
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false); 
 
  const [editTitle, setEditTitle] = useState(title); 
  const [editDescription, setEditDescription] = useState(description);

  React.useEffect(() => {
    setEditTitle(title);
    setEditDescription(description);
  }, [title, description]);


  const statusOptions = ["To Do", "In Progress", "Done"];

  const handleStatusChange = (e) => {
    onStatusChange(taskId, e.target.value);
  };
  
  const getStatusClass = (currentStatus) => {
    return `status-${currentStatus.toLowerCase().replace(/\s/g, '-')}`;
  };

  const selectClasses = `status-select ${getStatusClass(status)}`;


  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    onDeleteTask(taskId);
    setShowConfirmModal(false);
  };
  

  const handleStartEdit = () => {
    setEditTitle(title); 
    setEditDescription(description);
    setIsEditing(true);
  };
  
 
  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();
    

    if (trimmedTitle === '') return;

    onTaskEdit(taskId, trimmedTitle, editDescription);
    
    setIsEditing(false);
  };
  
 
  const handleCancelEdit = () => {
   
    setEditTitle(title); 
    setEditDescription(description);
    setIsEditing(false); 
  };
  

  return (
    <div className="task-card">
      
      {}
      <button 
        className="delete-task-button" 
        onClick={handleDeleteClick} 
        title="Excluir Tarefa"
      >
        ✕
      </button>
      
      {}
      {isEditing ? (
        
        <div className="task-edit-form">
          <input
            type="text"
            className="task-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="task-description-textarea"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="3"
          />
          <div className="edit-actions">
            <button 
              className="modal-button confirm-delete"
              onClick={handleSaveEdit}
            >
              Salvar
            </button>
            <button 
              className="modal-button cancel-delete"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
       
        <div onClick={handleStartEdit} style={{cursor: 'pointer'}}>
          <h3 className="task-title">{title}</h3>
          <p className="task-description">{description}</p>
        </div>
      )}
      
      <div className="task-details">
        {}
        <div className="task-members">
          {members.map((member, index) => (
            <span key={index} className="member-name-tag">
              {member.name}
            </span>
          ))}
          <AddMember 
            onAddMember={(memberName) => onAddMember(taskId, memberName)} 
          />
        </div>
        
        <div className="task-status">
          <select 
            className={selectClasses}
            value={status}
            onChange={handleStatusChange}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {}
      {showConfirmModal && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <p className="modal-message">Tem certeza que deseja excluir a tarefa: {title}?</p>
            <div className="modal-actions">
              <button 
                className="modal-button confirm-delete" 
                onClick={handleConfirmDelete}
              >
                Confirmar
              </button>
              <button 
                className="modal-button cancel-delete" 
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;