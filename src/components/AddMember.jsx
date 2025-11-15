// AddMember.jsx
import React, { useState } from 'react';
import './styles/AddMember.css'

const AddMember = ({ onAddMember }) => { 
  const [isAdding, setIsAdding] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const trimmedName = newMemberName.trim();
    if (trimmedName === '') {
      return; 
    }

    if (onAddMember) {
        onAddMember(trimmedName);
    }

    setNewMemberName('');
    setIsAdding(false); 
  };

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="add-member-form">
        <input
          type="text"
          className="member-input"
          placeholder="Nome do membro..."
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
          autoFocus
        />
        <button type="submit" className="confirm-member-button">
          ✓
        </button>
        <button 
          type="button" 
          className="cancel-member-button" 
          onClick={() => {
            setNewMemberName('');
            setIsAdding(false); 
          }}
        >
          ✕
        </button>
      </form>
    );
  }

  return (
    <button className="add-member-button" onClick={handleAddClick}>
      + Add member
    </button>
  );
};

export default AddMember;