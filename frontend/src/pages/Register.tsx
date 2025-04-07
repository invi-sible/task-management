import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://tqr8x2adp8.execute-api.us-east-1.amazonaws.com/dev/register', {
        username,
        password
      });
      setMessage(response.data.message || 'Registration successful!');
      setIsError(false);
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || 'Registration failed. Please try again.';
      setMessage(errMsg);
      setIsError(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Box>
          </form>
          {message && (
            <Box mt={2}>
              <Alert severity={isError ? 'error' : 'success'}>{message}</Alert>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
