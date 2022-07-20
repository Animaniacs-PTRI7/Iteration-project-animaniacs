const axios = require("axios");
import React, { useEffect, useState } from "react";

import { makeStyles } from '@mui/styles';
import { Stack, CardContent, Paper, TextField, Typography, Button, Modal } from "@mui/material";
import { faL } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  signupstack: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    // position: "absolute",
    margin: "30px auto auto 0px",
    left: "20%",
    right: "20%",
    zIndex: "1",
    width: '30em',
    textAlign: 'center',
    backgroundColor: 'white',
  },
}));

export default function SignUp({ setModalSignUp, modalSignUp }) {
  const classes = useStyles();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch here
    axios
      .post("/auth/signup", {
        buyer_nickname: username,
        buyer_email: email,
        password,
        userType: "buyer",
      })
      .then((response) => {
        // clear form
        setEmail("");
        setUsername("");
        setPassword("");
        // set "success" in state
        setSuccess(true);
      })
      .catch((error) => {
        // handle error
        console.log("hit error response");
        console.log(error);
      })
      .then(() => {
        console.log("end of fetch in signup");
        // always executed
      });
  };

  // display only success message if signup successful
  return ( 
    success ? (
      <div>
        <Paper elevation={6} className={classes.signupstack}>
          <h2> Sign Up </h2>
          <p>Account created successfully!</p>
        </Paper>
      </div>
    ) : (
    <Modal
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open={modalSignUp}
      onClose={setModalSignUp}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div>
        <Paper elevation={6} className={classes.signupstack}>
          <form className={classes.root} onSubmit={handleSubmit}>
            <h2> Sign Up </h2>
            <Stack spacing={2}>
              <TextField
                label={"Username"}
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                type="email"
                label={"Email"}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                type="password"
                label={"Password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" sx={{ m: 2, fontWeight: 700 }} onClick={() => setModalSignUp(false)} >
                  Cancle
                </Button>
                <Button type="submit" variant="contained" color="primary" sx={{ m: 2, fontWeight: 700 }} >
                  Submit
                </Button>
              </span>
            </Stack>
          </form>
        </Paper>
      </div>
    </Modal>
  ))
}
