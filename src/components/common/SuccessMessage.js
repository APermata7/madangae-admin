// src/components/common/SuccessMessage.js
import React, { useEffect } from 'react';

const SuccessMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Message disappears after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const style = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#155724',
    fontSize: '1.2em',
    cursor: 'pointer',
  };

  return (
    <div style={style}>
      <span>{message}</span>
      <button onClick={onClose} style={closeButtonStyle}>&times;</button>
    </div>
  );
};

export default SuccessMessage;