import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../index.css';
import BasicTable from '../components/Table.js';
import NewAddressDialog from '../features/Address/CreateAddressDialog';
import { Grid } from '@mui/material';
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  function Carregando(loading) {
    setLoading(!loading)
  }

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
              <Button
                color="primary"
                startDecorator={<DownloadRoundedIcon />}
                size="sm"
                sx={{margin: '10px'}}
              >
                Download CSV
              </Button>
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