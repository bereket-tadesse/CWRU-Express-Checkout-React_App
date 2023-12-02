import React from 'react';
import './style.css';
import Wrapper from './pages/Wrapper'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Chilanka, cursive'
  },
});



export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Wrapper />
      <ToastContainer position="bottom-right" />
      </ ThemeProvider>
    </div>
   
  );
}
