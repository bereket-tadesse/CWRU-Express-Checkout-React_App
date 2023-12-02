import * as React from 'react';
import LoginPage from './LoginPage.js';
import FormPage from './FormPage.js';
import RAPage from './RAPage.js';
import { useState } from 'react';

// This wrapper component is mainly used to transfer states across the formpage, loginpage, signin, signUp

function Wrapper() {
  const [isLoginVisible, setLoginVisible] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isRAPageVisible, setRAPageVisible] = useState(false);

  // state for the email extracted from LoginPage to be transfered to Form Page.
  const [emailReceived, setEmail] = useState('');

 

  const sendEmailToWrapper = (newEmail) => {
    
    setEmail(newEmail);
  };
  
  const updateLoginVisible = (newState) => {
    setLoginVisible(newState);
  };
  const updateFormVisible = (newState) => {
    setFormVisible(newState);
  };
  const updateRAPageVisible = (newState) => {
    setRAPageVisible(newState);
  };

  console.log('wrapper  is rendering');
  console.log('form visible:', isFormVisible, "Ra:", isRAPageVisible,"login: ",isLoginVisible );
  return (
    <>
      {isLoginVisible && (
        <LoginPage
          updateLoginVisible={updateLoginVisible}
          sendEmailToWrapper={sendEmailToWrapper}
          updateRAPageVisible ={updateRAPageVisible}
        />
      )}

      {!isLoginVisible && !isRAPageVisible && (
        <FormPage
          updateFormVisible={updateFormVisible}
          updateLoginVisible={updateLoginVisible}
          emailReceived={emailReceived}
        /> 
      ) }
       

      {isRAPageVisible && !isFormVisible && (
        <RAPage
        updateRAPageVisible={updateRAPageVisible}
          updateLoginVisible={updateLoginVisible}
        />
      )}
      
    </>
  );
}

export default Wrapper;
