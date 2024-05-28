import * as React from 'react';
import { useEffect, useState } from 'react';
import { API_URL } from '../App';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid } from '@mui/material';

ChartJS.register(Tooltip, Legend, ArcElement);

function buildPieGraphic(labels, dataset) {
  return {
    labels,
    datasets: [
      {
        label: 'Contagem de Endereços por UF',
        data: dataset,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',    // SP
          'rgba(54, 162, 235, 0.6)',    // RJ
          'rgba(255, 206, 86, 0.6)',    // MG
          'rgba(75, 192, 192, 0.6)',    // PR
          'rgba(153, 102, 255, 0.6)',   // RS
          'rgba(255, 159, 64, 0.6)',    // BA
          'rgba(255, 105, 180, 0.6)',   // PE
          'rgba(100, 149, 237, 0.6)',   // CE
          'rgba(255, 228, 196, 0.6)',   // GO
          'rgba(139, 69, 19, 0.6)',     // DF
          'rgba(60, 179, 113, 0.6)',    // SC
          'rgba(218, 165, 32, 0.6)',    // ES
          'rgba(255, 182, 193, 0.6)',   // PB
          'rgba(32, 178, 170, 0.6)',    // RN
          'rgba(255, 69, 0, 0.6)',      // AL
          'rgba(199, 21, 133, 0.6)',    // SE
          'rgba(173, 216, 230, 0.6)',   // PI
          'rgba(50, 205, 50, 0.6)',     // MA
          'rgba(139, 0, 0, 0.6)',       // AM
          'rgba(75, 0, 130, 0.6)',      // PA
          'rgba(240, 230, 140, 0.6)',   // AP
          'rgba(210, 105, 30, 0.6)',    // TO
          'rgba(123, 104, 238, 0.6)',   // RO
          'rgba(255, 215, 0, 0.6)',     // AC
          'rgba(0, 191, 255, 0.6)',     // RR
          'rgba(70, 130, 180, 0.6)',    // MT
          'rgba(107, 142, 35, 0.6)',    // MS
          'rgba(176, 196, 222, 0.6)'    // RS
        ],
        hoverOffset: 4,
      }
    ]
  };
}
const BuildGraphicLegend = ({ chartData }) => {
  return (
    <Grid
      item
      sx={{
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    >
      <h3>Balanço das Cidades:</h3>
      {chartData.labels && chartData.labels.map((label, index) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: chartData.datasets[0].backgroundColor[index],
              marginRight: 1
            }}
          />
          <p>{label}: {chartData.datasets[0].data[index]}</p>
        </Box>
      ))}
    </Grid>
  );
}


export default function PieChart() {
  const [loading, setLoading] = useState(true);
  const [graphicData, setGraphicData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const options = {}

  useEffect(() => {
    fetchAddressData();
  }, []);

  const fetchAddressData = async () => {
    const token = localStorage.getItem('token');
    const url = `${API_URL}/address/buscarEnderecos`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      const response = await axios.get(url, config);
      let { data } = response.data;
      const citiesCount = data.reduce((acc, { cidade }) => {
        acc[cidade] = (acc[cidade] || 0) + 1;
        return acc;
      }, {});
      const labels = Object.keys(citiesCount);
      const dataset = Object.values(citiesCount);
      const chartData = buildPieGraphic(labels, dataset);
      setGraphicData(chartData);
      setLoading(false);
    } catch (err) {
      setErrorMessage('Erro ao buscar dados da tabela');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Grid item md={7}>
        <Pie options={options} data={graphicData} />
      </Grid>
      <Grid item md={5} sx={{height: '100%', borderRadius: '4px'}}>
        <BuildGraphicLegend chartData={graphicData}/>
      </Grid>
    </Box>
  );
}