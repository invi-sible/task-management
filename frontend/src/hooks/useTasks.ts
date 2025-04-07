import { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = async (task: any) => {
    try {
      const newTask = await addTask(task);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskUpdated = async (updatedTask: any) => {
    try {
      await updateTask(updatedTask);
      setTasks(prevTasks =>
        prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDeleted = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return { tasks, handleTaskAdded, handleTaskUpdated, handleTaskDeleted };
};
