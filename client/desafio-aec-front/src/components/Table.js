import * as React from 'react';
import Table from '@mui/joy/Table';
import { useEffect, useState } from 'react';
import { API_URL } from '../App';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function BasicTable() {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
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
      const { data } = response.data;
      setTableData(data);
      setLoading(false);
      console.log(data[0].cep);
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
    <Table aria-label="basic table" className="Address-Table">
      <thead>
      <tr>
        <th style={{ width: '40%' }}>CEP</th>
        <th>Logradouro</th>
        <th>Complemento</th>
        <th>Bairro</th>
        <th>Cidade</th>
        <th>UF</th>
      </tr>
      </thead>
      <tbody>
      {tableData.map((row) => (
        <tr key={row.id}>
          <td>{row.cep}</td>
          <td>{row.logradouro}</td>
          <td>{row.complemento}</td>
          <td>{row.bairro}</td>
          <td>{row.cidade}</td>
          <td>{row.uf}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}