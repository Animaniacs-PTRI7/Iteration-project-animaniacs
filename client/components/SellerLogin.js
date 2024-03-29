const axios = require('axios');
import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Stack, Button, Modal, CardContent, Paper, TextField, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  signupstack: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    // position: 'absolute',
    margin: '30px auto auto 0px',
    left: '20%',
    right: '20%',
    zIndex: '1',
    width: '30em',
    textAlign: 'center'
  },
}));

export default function SellerLogin(props) {
  const classes = useStyles();
  const {closeLoginModal,showLogIn,setIsLoggedIn,setUserType,setUserZip,setUserId,setSuccess,setError} = props;

  // set form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/auth/login', {
        username,
        password,
        userType: 'seller',
      })
      .then((response) => {
        // if user_id sent, success
        if (response.data.user_id) {
          setIsLoggedIn(true);
          setUserType('seller');
          setUserZip(response.data.zip);
          setUserId(response.data.user_id);
          document.cookie = `userId=${response.data.user_id}`;
          document.cookie = `userZip=${response.data.zip}`;
          document.cookie = `userType=seller`;
          setSuccess(true)
        } else {
          console.log(response.data);
          setError(true)
        }
      })
      .catch((error) => {
        // handle error
        console.log('hit error response');
        setError(true)
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  return (
    <Modal
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    open={showLogIn}
    onClose={closeLoginModal}
    aria-labelledby="child-modal-title"
    aria-describedby="child-modal-description"
  >
    <div>
      <Paper elevation={6} className={classes.signupstack}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <h2>Kitchen LogIn </h2>
          <Stack spacing={2}>
            <TextField
              label=' Username / Email'
              // variant='filled'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label='Password'
              // variant='filled'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" sx={{ m: 2, fontWeight: 700 }} onClick={closeLoginModal} >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" sx={{ m: 2, fontWeight: 700 }} >
                Login
                </Button>
              </span>
          </Stack>
        </form>
      </Paper>
    </div>
    </Modal>
  );
}
