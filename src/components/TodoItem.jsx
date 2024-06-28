

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import { Paper, Typography, TextField } from '@mui/material';

const TodoItem = ({ id, title, description, status, onOpenMenu, onUpdateItem }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id, title, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id, title, status]);

  const handleBlurTitle = () => {
    onUpdateItem(id, newTitle, newDescription);
    setIsEditingTitle(false);
  };

  const handleBlurDescription = () => {
    onUpdateItem(id, newTitle, newDescription);
    setIsEditingDescription(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return '#2196f3'; // Blue color for New
      case 'ongoing':
        return '#ff9800'; // Orange color for Ongoing
      case 'done':
        return '#4caf50'; // Green color for Done
      default:
        return '#757575'; // Default color
    }
  };

  return (
    <Paper
      ref={drag}
      style={{
        padding: '10px',
        marginBottom: '10px',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        borderLeft: `6px solid ${getStatusColor(status)}`, // Set border color based on status
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onOpenMenu(e);
      }}
    >
      {isEditingTitle ? (
        <TextField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleBlurTitle}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleBlurTitle();
            }
          }}
          fullWidth
          autoFocus
          className="text-field-editing"
        />
      ) : (
        <Typography
          variant="subtitle1"
          onClick={() => setIsEditingTitle(true)}
          style={{ cursor: 'pointer' }}
          className="typography-subtitle"
        >
          {title}
        </Typography>
      )}
      {isEditingDescription ? (
        <TextField
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          onBlur={handleBlurDescription}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleBlurDescription();
            }
          }}
          
          fullWidth
          autoFocus
          className="text-field-editing"
        />
      ) : (
        <Typography
          variant="body2"
          onClick={() => setIsEditingDescription(true)}
          style={{ cursor: 'pointer' }}
          className="typography-body"
        >
          {description}
        </Typography>
      )}
      <Typography
        variant="caption"
        style={{
          color: getStatusColor(status), // Set text color based on status
          marginTop: '10px',
        }}
      >
        Status: {status}
      </Typography>
    </Paper>
  );
};

export default TodoItem;

