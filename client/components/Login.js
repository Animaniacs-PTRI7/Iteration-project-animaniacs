const axios = require('axios');
// const fetch = require('node-fetch');
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';

import { CardContent, Paper, TextField, Typography, Button, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';


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
    width: '30rem'
  },
}));

export default function Login(props) {
  const classes = useStyles();

  // set form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/auth/login', {
        username,
        password,
        userType: 'buyer',
      })
      .then((response) => {
        // if user_id sent, success
        console.log(response.data);
        if (response.data.user_id) {
          props.setIsLoggedIn(true);
          props.setUserType('buyer');
          props.setUserZip(response.data.zip);
          props.setUserId(response.data.user_id);
          document.cookie = `userId=${response.data.user_id}`;
          document.cookie = `userZip=${response.data.zip}`;
          document.cookie = `userType=buyer`;
        } else console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log('hit error response');
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  return (
    <div>
      <Paper elevation={6} className={classes.signupstack}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <h2> Log In </h2>
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
            <Button
              type='submit'
              // variant='contained'
              color='primary'
            >
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
