import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import LuggageIcon from '@mui/icons-material/Luggage';
import { toast } from 'react-toastify';
import PasswordIcon from '@mui/icons-material/Password';
// import imageSrc from '../components/cwruLogo.jpg';

function LoginPage({
  updateLoginVisible,
  updateFormVisible,
  sendEmailToWrapper,
  updateRAPageVisible
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    sendEmailToWrapper(email);
  };

  useEffect(()=>{

    toast.info("please sign Up if you dont have an account!");



  },[]);

  // toast.info("Sign Up first!")
  return (
    <div>
        <img src="https://pbs.twimg.com/profile_images/1666811721523269634/Zfahuafd_400x400.jpg" alt="Description of the image"  width="40" />

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        //  background: 'linear-gradient(to right, #5693f5, #f5c493)', 
        color: 'white',
        }}
        noValidate
        autoComplete="off"
        p={10}
      >
      
        
        <Paper elevation={3}  sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          background: 'linear-gradient(to right, #5693f5, #f5c493)', 
          color: 'white',
        }}>
          <Grid
            container
            spacing={2}
            p={3}
            justifyContent="center"
            alignItems="center"
          >
            <LuggageIcon /> CWRU EXPRESS CHECKOUT FORM
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                {/* Content for the second row */}
              
                <TextField
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  id="emailTF"
                  label="Email"
                  defaultValue={email}
                  onChange={handleEmailChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              {/* Content for the second row */}
              <Box display="flex" justifyContent="center">
              
                <TextField
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                }}
                  id="passwordTF"
                  label="Password"
                  type="password"
                  defaultValue={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Box display="flex" justifyContent="center">
                
                <SignUp email={email} password={password} />
                {String.fromCharCode(160)}
                <SignIn
                    email={email}
                    password={password}
                    updateLoginVisible={updateLoginVisible}
                    updateFormVisible={updateFormVisible}
                    updateRAPageVisible={updateRAPageVisible}
                  />
                  

                  
                
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default LoginPage;
