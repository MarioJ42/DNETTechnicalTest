import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getDataPackageById, updateUser } from '../services/api';
import { Container, Paper, Typography, Button, Box, CircularProgress, Alert, Divider } from '@mui/material';

const PurchaseConfirmationPage = () => {
  const { packageId } = useParams();
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [pkg, setPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await getDataPackageById(packageId);
        setPackage(response.data);
      } catch (err) {
        setError('Gagal memuat detail paket.');
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [packageId]);

  const handleConfirmPurchase = async () => {
    if (user.balance < pkg.price) {
      setError("Saldo tidak mencukupi.");
      return;
    }
    setIsProcessing(true);

    const newTransaction = {
      id: Date.now(),
      packageId: parseInt(pkg.id),
      packageName: pkg.name,
      date: new Date().toISOString(),
      amount: pkg.price,
    };

    const updatedUserData = {
      balance: user.balance - pkg.price,
      transactions: [...user.transactions, newTransaction],
    };

    try {
      const response = await updateUser(user.id, updatedUserData);
      refreshUser(response.data);
      navigate('/profile');
    } catch (err) {
      setError('Transaksi gagal. Silakan coba lagi.');
      setIsProcessing(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (!pkg) return <Alert severity="error">Paket tidak ditemukan.</Alert>;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Konfirmasi Pembelian</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6">{pkg.name}</Typography>
        <Typography variant="body1" color="text.secondary">{pkg.description}</Typography>
        <Typography variant="h5" color="primary" sx={{ my: 2 }}>
          Harga: Rp {pkg.price.toLocaleString('id-ID')}
        </Typography>
        <Typography variant="body1">
          Saldo Anda Saat Ini: Rp {user.balance.toLocaleString('id-ID')}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Sisa Saldo Setelah Pembelian: Rp {(user.balance - pkg.price).toLocaleString('id-ID')}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => navigate('/dashboard')} disabled={isProcessing}>
            Batal
          </Button>
          <Button variant="contained" onClick={handleConfirmPurchase} disabled={user.balance < pkg.price || isProcessing}>
            {isProcessing ? <CircularProgress size={24} /> : 'Konfirmasi & Bayar'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PurchaseConfirmationPage;