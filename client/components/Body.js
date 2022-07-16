import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import Cooking from '../assets/cooking.jpg';
import { Stack, Button } from '@mui/material';

import SignUp from './SignUp';
import Login from './Login';


//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    backgroundColor: 'transparent',
    padding: '0px 20px',
  },
  heavyFont: {
    color: 'white',
    fontWeight: '900',
    fontSize: '40px',
    fontFamily: 'Nunito',
  },
  buttonNest: {
    display: 'flex',
    margin: '0px 10px',
  },
  bottomText: {
    fontSize: '25px',
    position: 'absolute',
    bottom: '0',
    left: '20px',
    color: 'white',
  },
  textLink: {
    color: 'red',
  },
}));

export default function Body() {
  //Declare variables and state
  const classes = useStyles();
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogin] = useState(false);
  const [randomGreeting, setGreeting] = useState('');
  let signUpModule;

  //Sign-up Card Display Function
  const signUpFunc = (action) => {
    if (action == 'sign') {
      console.log('Button Clicked, sign up was ', signUp);
      setSignUp(!signUp);
      console.log('Sign up is now ', signUp);
    } else {
      setLogin(!logIn);
    }
  };

  useEffect(() => {
    // choose welcome text
    const greetings = [
      'cooking is',
      'banana bread is',
      'world famous meatballs are',
      'apple pie is',
      'ravioli is',
      'soul food is',
      '[ insert yummy food here ] is',
    ];

    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  if (signUp) {
    //signUpModule = <SignUp />;
  }

  if (logIn) {
    //signUpModule = <Login />;
  }

  //Return back to DOM
  return (
    <div className={classes.body}>
      <h1 className={classes.heavyFont}>
        {`Grandma's ${randomGreeting} just a button press away`}
      </h1>
      {signUpModule}
      <div>
        <Button
          component={Link}
          to='/signup'
          variant='contained'
          color='primary'
          onClick={() => {
            signUpFunc('sign');
          }}
        >
          Sign up
        </Button>
        <Button
          component={Link}
          to='/login'
          variant='contained'
          color='secondary'
          onClick={() => {
            signUpFunc('log');
          }}
        >
          Login
        </Button>
        </div>
      <Outlet />
      <p className={classes.bottomText}>
        Already a seller or want to become one? Click{' '}
        <Link className={classes.textLink} to='/seller'>
          here
        </Link>
        .
      </p>
    </div>
  );
}