import Navbar from '../components/Navbar';
import { Grid, useMediaQuery } from '@mui/material';
import React from 'react';

function Dashboard() {
  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  return (
    <Grid container>
      <Navbar name="Aec-Desafio" cor="#017BF7" />
      <Grid container className="LoginView-container">
      </Grid>
    </Grid>
  );
}

export default Dashboard;