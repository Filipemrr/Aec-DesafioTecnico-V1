import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios'
import {API_URL} from '../../App';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';



const NewAddressDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });


  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorSnackbarIdade, setErrorSnackbarIdade] = useState(false);
  const [passwordMatchErrorSnackbar, setPasswordMatchErrorSnackbar] = useState(false);
  const [confirmationSnackbar, setConfirmationSnackbar] = useState(false);
  const [error, setError] = useState(false)
  const [message,setMessage] = useState('')

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
    })
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      formData.nome.trim() === '' ||
      formData.email.trim() === '' ||
      formData.senha.trim() === '' ||
      formData.confirmarSenha.trim() === ''
    ) {
      setErrorSnackbar(true);
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setPasswordMatchErrorSnackbar(true);
      return;
    }
    // Adicione lógica de envio ou validação aqui
    const url = `${API_URL}/users/createUser`

    const headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = {
      email : formData.email,
      name : formData.nome,
      password : formData.senha
    }
    console.log(data);

    axios.post(url,data,headers)
      .then((response) =>{
        console.log(url, data, headers);
        if (response.status == 200) {
          setConfirmationSnackbar(true);
          console.log(response.data);
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error)
        setMessage(error.response.data.message)
        setError(true)
      })

  };

  const handleSnackbarClose = () => {
    setErrorSnackbar(false);
    setPasswordMatchErrorSnackbar(false);
    setConfirmationSnackbar(false);
    setErrorSnackbarIdade(false)
    setError(false)
  };

  return (
    <>
      <Button
        color="success"
        startDecorator={<DownloadRoundedIcon />}
        onClick={handleOpen}
        sx={{bgcolor: 'green', color: 'white', margin:'10px'}}
      >
       Adicionar Endereco
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro de Usuário</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <PersonIcon color="action" />
              ),
            }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <EmailIcon color="action" />
              ),
            }}
          />
          <TextField
            label="Senha"
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <LockIcon color="action" />
              ),
            }}
          />
          <TextField
            label="Confirmar Senha"
            type="password"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <LockIcon color="action" />
              ),
            }}
          />
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
      <Snackbar open={errorSnackbarIdade} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Idade Invalida!.
        </Alert>
      </Snackbar>
      <Snackbar open={errorSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Todos os Campos devem ser preenchidos!
        </Alert>
      </Snackbar>
      <Snackbar open={passwordMatchErrorSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Os Campos de senha devem coincidir!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={confirmationSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}

        >
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewAddressDialog;
