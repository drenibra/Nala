import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import {NavLink} from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import { useStore } from './../stores/store';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './../components/Navbar/ResponsiveAppBar';
import "../styles/components.css";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Stud.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const LandingPage = observer(function LandingPage(props) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);
  const { userStore } = useStore();
  return (
    <>
      <ResponsiveAppBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
              <h1>Welcome, {userStore.user?.firstName}</h1>
          </Box>
          <Box 
            sx={{
             display: 'flex',
             flexDirection: 'column'
            }}>
            <NavLink to="/sim"><Button sx={{width: '200px'}} variant="contained">Personal Avatar</Button></NavLink>
            <hr />
            <NavLink to="/virtual-coach"><Button sx={{width: '200px'}} variant="contained" >AI Coach</Button></NavLink>
            <hr />
            <NavLink  to=""><Button sx={{width: '200px'}} variant="contained">Blind Lunch Date</Button></NavLink>
            <hr />
            <NavLink  to="/AIorHumanGame"><Button sx={{width: '200px'}} variant="contained">AI or Human?</Button></NavLink>
            </Box>
          <Copyright sx={{ mt: 8, mb: 4, position: 'absolute', bottom: 0, right: '-50%', left: '-50%' }} />
        </Container>
      </ThemeProvider>
    </>
  );
});

export default LandingPage;
