import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUsers } from '../services/api';
import { Container, Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email tidak boleh kosong.');
      return;
    }
    try {
      const response = await getUsers();
      const foundUser = response.data.find(user => user.email === email);
      if (foundUser) {
        login(foundUser);
        navigate('/dashboard');
      } else {
        setError('Pengguna tidak ditemukan.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan json-server sudah berjalan.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Alamat Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Masuk
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;