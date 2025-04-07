import axios from 'axios';

const API = 'https://tqr8x2adp8.execute-api.us-east-1.amazonaws.com/dev';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API}/login`, { username, password });
  const { token } = res.data;
  localStorage.setItem('token', token);
  return token;
};

export const getTasks = async () => {
  try {
    const res = await axios.get(`${API}/tasks`, { headers: getAuthHeaders() });
    return res.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (task: any) => {
  try {
    const res = await axios.post(`${API}/tasks`, task, { headers: getAuthHeaders() });
    return res.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTask = async (task: any) => {
  try {
    const res = await axios.put(`${API}/tasks/${task.id}`, task, { headers: getAuthHeaders() });
    return res.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await axios.delete(`${API}/tasks/${taskId}`, { headers: getAuthHeaders() });
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
