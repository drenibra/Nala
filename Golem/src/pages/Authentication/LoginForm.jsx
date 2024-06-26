import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../../styles/components.css";
import image from '../../assets/background.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        GOLEM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const LoginForm = observer(function LoginForm(props) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);
  const { userStore } = useStore();

  const initialValues = {
    email: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const loggedIn = await userStore.login(formValues);
      navigate('/');
    } catch (error) {
      setErrorMsg(true);
      console.log(errorMsg);
    }
  };
  return (
    <div style={{ backgroundImage:`url(${image})`, backgroundSize: 'cover',  height: '100vh'}}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" id="loginForm" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField className='txtField' margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={handleTextFieldChange} />
            <TextField className='txtField' margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={handleTextFieldChange} />
            <Button className='golem-button' type="submit" id="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {userStore.error && <Alert severity="error">Invalid password or email!</Alert>}
            <Grid container>
              <Grid item xs>
                <Link to="#" style={{ color: 'rgb(60,182,238)' }} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" id="signUpLink" style={{ color: 'rgb(60,182,238)'}} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
});

export default LoginForm;
