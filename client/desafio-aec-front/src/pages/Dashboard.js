import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import GenerateCSV from '../features/Address/GenerateCSV';
import '../index.css';
import BasicTable from '../components/Table.js';
import NewAddressDialog from '../features/Address/CreateAddressDialog';
import { Grid } from '@mui/material';
export default function Dashboard() {
  return (
    <Grid>
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Box
          component="main"
          className="MainContent"
        >
          <Box
            className="ContentBox"
          >
            <Typography level="h2" component="h1">
              Endereço
            </Typography>
            <Box>
              <NewAddressDialog/>
              <GenerateCSV/>
            </Box>
          </Box>
          <Box
          className='TableContent'
          >
          <BasicTable/>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}