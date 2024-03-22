import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '../Button/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useStore } from '../../stores/store';
import { Link, NavLink } from 'react-router-dom';
// import Logo from '../../assets/logo/icon-stud-io.svg';
import { observer } from 'mobx-react-lite';
import '../../styles/navbar.css';
import Logo from "../../assets/NalaLogoWhite.svg"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ResponsiveAppBar = observer(function ResponsiveAppBar() {
  const { userStore } = useStore();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    {
      name: 'VirtualCoach',
      path: '/virtual-coach',
    },
    {
      name: 'Sim',
      path: '/sim',
    },
  ].filter(Boolean);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className='toolbar'>
          <NavLink to="/" sx={{position: 'absolute', left: 0, width: 100, color: 'white'}} >
            <ArrowBackIcon/>
          </NavLink>
          <Link to="/" className="logo">
            <img src={Logo} alt="Our logo." style={{ width: '75px' }} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink key={page.name} to={page.path} className="navlink">
                {page.name}
              </NavLink>
            ))}
          </Box>
          {/* {userStore.isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton id="openSettings" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userStore.getProfileImage()} />
                </IconButton>
              </Tooltip>
              <Menu
                className="menu"
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link id="profileButton" to="/MyProfile">
                    <Typography color="common.black" textAlign="center">
                      Profile
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    userStore.logout();
                  }}
                >
                  <Typography color="common.black" textAlign="center">
                    Log Out
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : ('')
          // (
          //   <Link to="/login">
          //     <Button variant="contained">Sign In</Button>
          //   </Link>
          // )
          } */}
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default ResponsiveAppBar;
