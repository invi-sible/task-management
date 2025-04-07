import React from 'react';
import StatusChart from '../components/StatusChart';
import { Container, Typography } from '@mui/material';

export default function Stats() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Task Status Chart</Typography>
      <StatusChart />
    </Container>
  );
}
