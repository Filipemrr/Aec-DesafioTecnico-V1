import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { API_URL } from '../../App';

const DeleteAddressDialog = ({ ActualRow }) => {
  const [open, setOpen] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [confirmationSnackbar, setConfirmationSnackbar] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleSubmit = async () => {
    const addressID  = ActualRow.id;
    console.log(addressID)
    if (!addressID) {
      setErrorSnackbar(true);
      return;
    }
    const url = `${API_URL}/address/deletarEndereco`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      data: { addressID }
    };

    try {
      const response = await axios.delete(url, config);
      if (response.status === 200) {
        setConfirmationSnackbar(true);
        handleClose();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao realizar alterações');
      setError(true);
    }
  };

  const handleSnackbarClose = () => {
    setErrorSnackbar(false);
    setConfirmationSnackbar(false);
    setError(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <DeleteOutlineIcon fontSize='small' sx={{ color: 'red' }} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Deletar Endereço</DialogTitle>
        <DialogContent>
          <p>Você tem certeza que deseja deletar este endereço?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="error" variant="contained">
            Deletar
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={confirmationSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          Endereço deletado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteAddressDialog;