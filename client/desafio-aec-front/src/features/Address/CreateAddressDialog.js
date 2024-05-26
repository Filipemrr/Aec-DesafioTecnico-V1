import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { API_URL } from '../../App';

const NewAddressDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: ''
  });
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [confirmationSnackbar, setConfirmationSnackbar] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      numero: ''
    });
    window.location.reload();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCEPData = async () => {
    let { cep } = formData;
    cep = cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      setMessage('CEP inválido');
      setError(true);
      return;
    }
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      setFormData((prevData) => ({
        ...prevData,
        logradouro: data.logradouro || '',
        complemento: data.complemento || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        uf: data.uf || '',
      }));
    } catch (err) {
      setMessage('Erro ao buscar dados do CEP');
      setError(true);
    }
  };

  const handleSubmit = async () => {
    const { cep, logradouro, complemento, bairro, cidade, uf, numero } = formData;

    if (!cep || !logradouro || !bairro || !cidade || !uf || !numero) {
      setErrorSnackbar(true);
      return;
    }

    const url = `${API_URL}/address/novoEndereco`;
    const data = { cep, logradouro, complemento, bairro, cidade, uf, numero };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    try {
      const response = await axios.post(url, data, config);
      if (response.status === 200) {
        setConfirmationSnackbar(true);
        handleClose();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao realizar cadastro');
      setError(true);
    }
  };

  const handleSnackbarClose = () => {
    setErrorSnackbar(false);
    setConfirmationSnackbar(false);
    setError(false);
  };

  const fields = [
    { label: 'CEP', name: 'cep', type: 'text', placeholder: '12345-678', icon: <PersonIcon color="action" /> },
    { label: 'Logradouro', name: 'logradouro', type: 'text', placeholder: 'Rua Exemplo 1', icon: null },
    { label: 'Complemento', name: 'complemento', type: 'text', placeholder: 'Apto 101', icon: null },
    { label: 'Bairro', name: 'bairro', type: 'text', placeholder: 'Bairro 1', icon: null },
    { label: 'Cidade', name: 'cidade', type: 'text', placeholder: 'Cidade Exemplo', icon: null },
    { label: 'UF', name: 'uf', type: 'text', placeholder: 'SP', icon: null },
    { label: 'Número', name: 'numero', type: 'text', placeholder: '123', icon: null },
  ];

  return (
    <>
      <Button
        color="success"
        startDecorator={<PersonIcon />}
        onClick={handleOpen}
        sx={{ bgcolor: 'green', color: 'white', margin: '10px' }}
      >
        Adicionar Endereço
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro de Endereço</DialogTitle>
        <DialogContent>
          {fields.map((field, index) => (
            <TextField
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              placeholder={field.placeholder}
              InputProps={{
                startAdornment: field.icon,
                endAdornment: field.name === 'cep' && (
                  <InputAdornment position="end">
                    <IconButton onClick={fetchCEPData}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" variant='contained'>
            Cadastrar
          </Button>
          <Button onClick={handleClose} color="error" variant='contained'>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={errorSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          Todos os Campos devem ser preenchidos!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={confirmationSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewAddressDialog;