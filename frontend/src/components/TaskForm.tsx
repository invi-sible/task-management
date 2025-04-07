import React, { useState } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import { useTasks } from '../hooks/useTasks';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const { handleTaskAdded } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { title, description, status };
    handleTaskAdded(newTask);
    setTitle('');
    setDescription('');
    setStatus('todo');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <Button type="submit" variant="contained">Add Task</Button>
      </Stack>
    </form>
  );
};

export default TaskForm;
