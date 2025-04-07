import React from 'react';
import { Container, Typography } from '@mui/material';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Task Management</Typography>
      <TaskForm />
      <TaskList />
    </Container>
  );
};

export default Home;
