import React from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ButtonGroup,
  Button,
  useMediaQuery,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import {blue} from "@mui/material/colors";

const Navbar = ({ name }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClick = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
    setAccountMenuAnchorEl(null);
  };

  const navigate = useNavigate();

  const navigateTo = (rota) => {
    navigate(`${rota}`);
    handleClose();
  };

  const isSmallScreen = useMediaQuery('(max-width: 420px)');

  return (
    <AppBar  position="static">
      <Toolbar className={"footerView"}>
        <Button variant="contained" sx={{bgcolor: 'black'}}>{name}</Button>
        <IconButton
          size="large"
          style={{ marginLeft: 'auto', color: 'black' }}
          onClick={handleAccountMenuClick}
        >
          <AccountCircleIcon fontSize='large' />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
