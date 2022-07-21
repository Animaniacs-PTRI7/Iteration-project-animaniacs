const axios = require("axios");
import React, { useState,useEffect } from "react";

import { makeStyles } from "@mui/styles";
import {
  Stack,
  Modal,
  AlertTitle,
  Paper,
  TextField,
  Alert,
  Button,Snackbar
} from "@mui/material";

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
    width: "30em",
    textAlign: 'center'
  },
}));

export default function SellerSignUp(props) {
  const classes = useStyles();
 const { showSignUp,setModalSignUp, closeSignUpModal,setSuccess,setError } = props
  // set form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch here
    axios
      .post("/auth/signup", {
        seller_nickname: username,
        seller_email: email,
        password,
        userType: "seller",
      })
      .then((response) => {
        // clear form
        setEmail("");
        setUsername("");
        setPassword("");
        // set "success" in state
        setSuccess(true);
        setModalSignUp(false)
      })
      .catch((error) => {
        // handle error
        console.log("hit error response");
        setError(true)
        console.log(error);
      })
      .then(() => {
        console.log("end of fetch in signup");
        // always executed
      });
  };


  // display only success message if signup successful


  return  (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={showSignUp}
      onClose={closeSignUpModal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div>
        <Paper elevation={6} className={classes.signupstack}>
          <form className={classes.root} onSubmit={handleSubmit}>
            <h2>Kitchen Sign Up</h2>
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
              <span style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  sx={{ m: 2, fontWeight: 700 }}
                  onClick={closeSignUpModal}
                >
                  Cancle
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ m: 2, fontWeight: 700 }}
                >
                  Submit
                </Button>
              </span>
            </Stack>
          </form>
        </Paper>
      </div>
    </Modal>
  );
}
