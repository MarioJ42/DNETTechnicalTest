import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Divider } from '@mui/material';

const CustomerProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Typography>Silakan login untuk melihat profil.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}>
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4">{user.name}</Typography>
            <Typography variant="body1" color="text.secondary">{user.email}</Typography>
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          Saldo Anda: <span style={{ color: '#1976d2' }}>Rp {user.balance.toLocaleString('id-ID')}</span>
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" gutterBottom>
          Riwayat Transaksi
        </Typography>
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama Paket</TableCell>
                <TableCell align="right">Tanggal</TableCell>
                <TableCell align="right">Jumlah</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.transactions.length > 0 ? (
                user.transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.packageName}</TableCell>
                    <TableCell align="right">{new Date(tx.date).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell align="right">Rp {tx.amount.toLocaleString('id-ID')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">Belum ada transaksi.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default CustomerProfilePage;