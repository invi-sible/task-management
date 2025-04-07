import React from 'react';
import { Button, Card, CardContent, Typography, CardActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTasks } from '../hooks/useTasks';

const TaskList = () => {
  const { tasks, handleTaskUpdated, handleTaskDeleted } = useTasks();

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task.id} variant="outlined" sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography>{task.description}</Typography>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={task.status}
                onChange={(e) => handleTaskUpdated({ ...task, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="to-do">To Do</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button color="secondary" variant="contained" onClick={() => handleTaskDeleted(task.id)}>Delete</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
