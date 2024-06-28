// src/components/AddTodoForm.jsx
import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const AddTodoForm = ({ onAddTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onAddTodo({
                id: Date.now(),
                title,
                description,
                status: 'New',
            });
            setTitle('');
            setDescription('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 3 }}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                margin="normal"
                multiline
                rows={3}
            />
            <Button type="submit" variant="contained" fullWidth>
                Add Todo
            </Button>
        </Box>
    );
};

export default AddTodoForm;
