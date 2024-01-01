import React from 'react';
import Button from '@mui/material/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import LoginIcon from '@mui/icons-material/Login';

function SignIn({email, password, updateLoginVisible, updateRAPageVisible}) {
 
  const handleSignIn = () => {
    console.log('click working');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('sucess');
        toast.success('Signed In😀');
        updateLoginVisible(false);
        if(email=='ra@case.edu'){
          updateRAPageVisible(true);
        }
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', errorMessage);
        toast.error('Sign in error: ');

        if(!email) {
          toast.error('please Enter email');
        } 
        if(!password) {
          toast.error('please Enter password');
        }
      });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleSignIn}  startIcon={<LoginIcon />}>
      SignIn
    </Button>
  );
}
export default SignIn;
