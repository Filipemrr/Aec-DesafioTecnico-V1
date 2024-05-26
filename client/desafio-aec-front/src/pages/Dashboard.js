import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import '../index.css';
import BasicTable from '../components/Table.js';
export default function Dashboard() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
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
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download CSV
            </Button>
          </Box>
          <Box
          className='TableContent'
          >
          <BasicTable/>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}