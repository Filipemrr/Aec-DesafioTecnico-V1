import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import GenerateCSV from '../features/Address/GenerateCSV';
import '../index.css';
import BasicTable from '../components/Table.js';
import NewAddressDialog from '../features/Address/CreateAddressDialog';
import { Grid } from '@mui/material';
import PieChart from '../components/PieChart';

function Header()  {
  return (
    <Grid item>
    <Typography level="h2" component="h1">
      Endereço
    </Typography>
  <Box>
    <NewAddressDialog/>
    <GenerateCSV/>
  </Box>
    </Grid>
  )
}
function Table()  {
  return (
    <Grid item
          className='TableContent'
    >
      <BasicTable/>
    </Grid>
  )
}

function LeftDataRepresentation() {
  return (
    <Grid item md={6}
          className='firstGrphic'
          sx={{border: '1px solid #232e29', borderRadius: '4px', padding: '10px'}}
    >
      <PieChart/>
    </Grid>
  )
}

function RightDataRepresentation() {
  return (
    <Grid item md={5.5}
          className='firstGrphic'
          sx={{border: '1px solid red'}}
    >
      <p>sdas</p>
    </Grid>
  )
}
export default function Dashboard() {
  return (
    <Grid>
      <Grid container sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Grid container
          component="main"
          className="MainContent"
        >
          <Header/>
          <Table/>

          <LeftDataRepresentation/>
          <RightDataRepresentation/>
        </Grid>
      </Grid>
    </Grid>
  );
}