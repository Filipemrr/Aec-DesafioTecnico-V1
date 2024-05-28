import React from 'react';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { API_URL } from '../../App';

const GenerateCSV = () => {
  const fetchData = async () => {
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/address/buscarEnderecos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(obj => formatToCSV(obj))
      .catch(err => {
        console.error('Erro ao buscar dados:', err);
      });
  };

  function formatToCSV(addressData) {
    const headers = Object.keys(addressData.data[0]).toString();
    const main = addressData.data.map((item) => {
      return Object.values(item).toString();
    });
    const csv = [headers, ...main].join('\n');
    startCSVDownload(csv);
  }

  function startCSVDownload(readyData) {
    const blob = new Blob([readyData], { type: 'application/csv' });
    const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = 'aec-address.csv';
      a.href = url;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      window.location.reload();
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<UploadIcon />}
        onClick={fetchData}
        sx={{margin: '10px'}}
        id="btn"
      >
        Gerar CSV
      </Button>
    </>
  );
};

export default GenerateCSV;