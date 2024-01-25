import * as React from 'react';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react'; 
import { getDatabase, ref, set, onValue } from 'firebase/database';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function RAPage({ updateLoginVisible, updateRAPageVisible }) {
  //note: use effect runs only once during mount and runs on every state change if there is no dependecy.

  const [data, setData] = useState('');

  useEffect(() => {
    console.log('running once');
    const getData = () => {
      const db = getDatabase();
      const starCountRef = ref(db, 'users/');
      //data from data base initialized
      let data = null;
      console.log(starCountRef);
      onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
        console.log('data is coming:', snapshot.exists());
        console.log(data);
      });

      setData(data);
      toast.success('data retrieved!');
    };

    getData();
  }, []);

  const handleSignOutClick = () => {
    updateRAPageVisible(false);
    updateLoginVisible(true);
    toast.success('Signed Out!');
  };

  return (
    <>
      <Paper>
              <Typography variant="subtitle1" gutterBottom>
                Student Checkorut List
              </Typography>
            </Paper>
      {Object.entries(data).map(([key, value], index) => (
        <>
          <Button key={index} variant="contained" color="success">
            {Object.entries(value).map(([nestedKey, nestedValue]) => (
              <div key={nestedKey}>
                {nestedKey}: {nestedValue}
              </div>
            ))}
          </Button>
          {/* adding spaces */}
          {String.fromCharCode(160)}
        </>
      ))}
      <Button variant="contained" color="error" onClick={handleSignOutClick}>
        SignOut
      </Button>
    </>
  );
}
export default RAPage;
