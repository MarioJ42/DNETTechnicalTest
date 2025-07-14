import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDataPackages } from '../services/api';
import { Container, Grid, Typography, Card, CardContent, CardActions, Button, Box, CircularProgress, Alert } from '@mui/material';

const DashboardPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getDataPackages();
        setPackages(response.data);
      } catch (error) {
        setError('Gagal memuat paket data. Pastikan server API berjalan.');
        console.error("Failed to fetch data packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pilih Paket Data Internet
      </Typography>
      <Grid container spacing={4}>
        {packages.map((pkg) => (
          <Grid item key={pkg.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {pkg.name}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  Rp {pkg.price.toLocaleString('id-ID')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pkg.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/purchase/${pkg.id}`} variant="contained" size="small">
                  Beli Sekarang
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardPage;