import React from 'react';
import Button from '@mui/material/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


function SignUp({ email, password}) {


  const handleSignUp = () => {
    console.log('click working');
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('sucess');
        toast.success('SignedUp!');
        toast.info('please click signIn to login!');
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', errorMessage);
        toast.error('Sign Up Error. ', errorMessage, errorCode);
        if(!email) {
          toast.error('please Enter email');
        } 
        if(!password) {
          toast.error('please Enter password');
        }
      });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleSignUp}  startIcon={<AppRegistrationIcon />}>
      SignUp
    </Button>
  );
}
export default SignUp;
