import * as React from 'react';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import moment from 'moment';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';

function FormPage({ updateFormVisible, updateLoginVisible, emailReceived }) {
  // extracting the networkID from the email received from login page for database extraction if user data exists.
  console.log('it issssss rendering');
  const receievedNetworkID = emailReceived.substring(
    0,
    emailReceived.indexOf('@')
  );

  const [formData, setFormData] = useState({
    networkID: '',
    checkoutType: '',
    username: '',
    bldgNumber: '',
    keyCode: '',
    signature: '',
    dateSigned: '',
    controlLoop: '',
  });

  //note: use effect runs only once during mount and runs on every state change if there is no dependecy.
  useEffect(() => {
    console.log('running once');
    const getData = () => {
      const db = getDatabase();
      const starCountRef = ref(db, 'users/' + receievedNetworkID);
      //data from data base initialized
      let data = null;
      console.log(starCountRef);
      onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
        console.log('data is coming:', snapshot.exists());
      });

      if (data) {
        setFormData(data);
        toast.success('data restored!');
      }
    };

    getData();
  }, []);

  const handleChange = (e) => {
    // for the radio group because it doesnt have .id property
    const propertyName = e.target.name || e.target.id;
    setFormData({
      ...formData,
      [propertyName]: e.target.value,
    });
    console.log(
      'target id is: ',
      e.target.name,
      'target value is: ',
      e.target.value
    );
  };

  
  const handleSignOutClick = () => {
    updateFormVisible(false);
    updateLoginVisible(true);
    toast.success('Signed Out!');
  };

  const writeUserData = () => {
    const db = getDatabase();

    //validating all fields are entered
    if (
      formData.networkID &&
      formData.username &&
      formData.checkoutType &&
      formData.bldgNumber &&
      formData.keyCode &&
      formData.signature &&
      formData.networkID
    ) {
      set(ref(db, 'users/' + formData.networkID), {
        username: formData.username,
        checkoutType: formData.checkoutType,
        bldgNumber: formData.bldgNumber,
        keyCode: formData.keyCode,
        signature: formData.signature,
        // for test
        dateSigned: formData.dateSigned,
        networkID: formData.networkID,
      });
      toast.success('Succefully submited!');
      //console.log(name, checkoutType, bldgNumber, keyCode, signature);
    } else {
      if (!formData.networkID) {
        toast.error('Please enter NetworkID.');
      }
      if (!formData.username) {
        toast.error('Please enter username.');
      }
      if (!formData.checkoutType) {
        toast.error('Please enter checkoutType.');
      }
      if (!formData.signature) {
        toast.error('Please enter signature.');
      }
      if (!formData.bldgNumber) {
        toast.error('Please enter bldgNumber.');
      }

    }
  };
 
  console.log('data isssss : ', formData);
  //console.log(networkID, name, bldgNumber, dateSigned);
  return (
    <>
      <img src="https://pbs.twimg.com/profile_images/1666811721523269634/Zfahuafd_400x400.jpg" alt="Description of the image"  width="40" />

      <Paper sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        //  background: 'linear-gradient(to right, #5693f5, #5693f5)', 

        }} >
        <Typography>{''}</Typography>
        <Grid container spacing={2} p={5}>
          <Grid xs={12}>
            <Paper>
              <Typography variant="subtitle1" gutterBottom>
                STUDENT CHECKOUT ENVELOPE
              </Typography>
            </Paper>
          </Grid>

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Checkout Type
            </FormLabel>
            <RadioGroup
              id="checkoutType"
              aria-labelledby="demo-radio-buttons-group-label"
              name="checkoutType"
              onChange={handleChange}
              value={formData.checkoutType}
            >
              <FormControlLabel
                value="By Appointement"
                control={<Radio />}
                label="By Appointement"
              />
              <FormControlLabel
                value="Express Checkout"
                control={<Radio />}
                label="Express Checkout"
              />
            </RadioGroup>
          </FormControl>

          <Grid xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Instructions: Please fill out all the information below and submit
              when you finish.
            </Typography>
          </Grid>

          <Grid xs={12}>
            {' '}
            <div>
              <InputLabel htmlFor="my-input">Enter Your Name:</InputLabel>
              <TextField
                required
                label="Required"
                id="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <InputLabel htmlFor="my-input">Enter Your Network ID:</InputLabel>
            <TextField
              required
              label="Required"
              id="networkID"
              variant="outlined"
              value={formData.networkID}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12}>
            {' '}
            <div>
              <InputLabel htmlFor="my-input">
                Enter your building number and room#:
              </InputLabel>
              <TextField
                required
                label="Required"
                id="bldgNumber"
                variant="outlined"
                onChange={handleChange}
                value={formData.bldgNumber}
              />
            </div>
          </Grid>

          <Grid xs={12}>
            {' '}
            <div>
              <InputLabel htmlFor="my-input">Enter your Key Code:</InputLabel>
              <TextField
                required
                label="Required"
                id="keyCode"
                variant="outlined"
                onChange={handleChange}
                value={formData.keyCode}
              />
            </div>
          </Grid>

          <Grid xs={12}>
            {' '}
            <Typography variant="subtitle1" gutterBottom>
              By using this Express Check-out from:
              <FormControlLabel
                control={<Checkbox checked color="success" />}
                label="I understand that a University staff member will inventory the room or common area in my absence and  assess charges for cleaning and or damage based upon the judgment of the staff member."
              />
              <FormControlLabel
                control={<Checkbox checked color="success" />}
                label="I understand that by signing this statement, I agree to accept
                full responsibility for the condition of the room/common area as
                determined by the staff member."
              />
            </Typography>
          </Grid>

          <Grid xs={12}>
            {' '}
            <div>
              <InputLabel htmlFor="my-input">Student Signature:</InputLabel>
              <TextField
                required
                label="Required"
                id="signature"
                variant="outlined"
                onChange={handleChange}
                value={formData.signature}
              />
            </div>
          </Grid>
          <Grid xs={12}>
            {' '}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    name="dateSigned"
                    label="Date Signed"
                    // Onchange to be figured out
                    // value={new Date()}
                    // onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Grid>

          <Button variant="contained" color="success" onClick={writeUserData}>
            Submit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSignOutClick}
          >
            SignOut
          </Button>
        </Grid>
      </Paper>
    </>
  );
}

export default FormPage;
