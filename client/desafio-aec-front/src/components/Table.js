import * as React from 'react';
import Table from '@mui/joy/Table';
import { useEffect, useState } from 'react';
import { API_URL } from '../App';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import UploadAddressDialog from '../features/Address/UploadAddressDialog';

export default function BasicTable() {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
      let { data } = response.data;
      data = data.sort((a, b) => a.id - b.id); //ordena pelo ID
      setTableData(data);
      setLoading(false);
    } catch (err) {
      setErrorMessage('Erro ao buscar dados da tabela');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Table borderAxis="both">
        <caption>Seus enderecos cadastrados </caption>
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
            <td>
              <UploadAddressDialog ActualRow={row} />
              {row.cep}
            </td>
            <td>{row.logradouro}</td>
            <td>{row.complemento}</td>
            <td>{row.bairro}</td>
            <td>{row.cidade}</td>
            <td>{row.uf}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={errorMessage}
      />
    </>
  );
}