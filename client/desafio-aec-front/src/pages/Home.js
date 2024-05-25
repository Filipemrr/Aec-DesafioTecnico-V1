import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, useMediaQuery, Snackbar, Alert } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CadastroDialog from '../features/Login/CadastroDialog';
import { useNavigate } from 'react-router';
import axios from 'axios'
import "../index.css"


function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()

  const handleLogin = () => {
    // Lógica de login aqui, por exemplo, enviar os dados para um servidor
    const url = `http://localhost:3000/users/login`
    const data = {
      username: email,
      password: password
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post(url, data, config)
      .then((response) => {
        const { statusCode, data } = response.data;
        if (statusCode === 200) {
          localStorage.setItem('token', data.token);
          navigate('/meuperfil');
        } else {
          setErrorMessage('Erro Interno, contate o adiministrador');
          setOpenSnackbar(true);
        }
      })
      .catch((err) => {
        setErrorMessage('Credenciais inválidas');
        setOpenSnackbar(true);
      })
  };

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return (
    <Grid container>
      {/* Navbar */}
      <Navbar name={'Aec-Desafio'} cor={'#017BF7'} />


      {/* Grid Container com imagem de fundo */}
      <Grid
        container
        className="LoginView-container"
      >
        {/* Primeiro Item (metade da largura) */}
        {!isSmallScreen && (
          <Grid item xs={12} md={6} className={"aec-logo"}>
            <img src="/logo.png" alt="Logo AeC" />
          </Grid>
        )
        }

        {/* Segundo Item (metade da largura) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
            Bem-vindo!
          </Typography>

          <Typography variant="h4" gutterBottom sx={{ color: 'black', paddingBottom: '30px' }}>
            Faça Login na sua Conta!
          </Typography>

          <TextField
            label={
              <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <MailLockOutlinedIcon sx={{ paddingRight: '5px' }} /> Usuário
              </Typography>
            }
            variant="outlined"
            margin="normal"
            sx={{ marginBottom: 2, width: '50%' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label={
              <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <LockOpenIcon sx={{ paddingRight: '5px' }} /> Senha
              </Typography>
            }
            variant="outlined"
            type="password"
            margin="normal"
            sx={{ marginBottom: 2, width: '50%' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <CadastroDialog />
          <Button variant="contained" color="primary" onClick={handleLogin} sx={{ bgcolor: '#0CA789', width: '25%' }}>
            Entrar
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Grid>
  );
}


export default Home;