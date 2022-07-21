const axios = require("axios");
import React, { useState } from "react";

import { makeStyles } from "@mui/styles";
import {
  Stack,
  CardContent,
  Paper,
  TextField,
  Typography,
  Button,
  Card,
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
    textAlign: "center",
    backgroundColor: "white",
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  // set form state
  const [email2, setEmail2] = useState(email);
  const [password2, setPassword2] = useState(password);
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
  const handleSuccess = (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", {
        username: "z",
        password: "z",
        userType: "buyer",
      })
      .then((response) => {
        // if user_id sent, success
        console.log(response.data);
        if (response.data.user_id) {
          props.setIsLoggedIn(true);
          props.setUserType("buyer");
          props.setUserZip(null);
          props.setUserId(response.data.user_id);
          document.cookie = `userId=${response.data.user_id}`;
          document.cookie = `userZip=${response.data.zip}`;
          document.cookie = `userType=buyer`;
        } else console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log("hit error response");
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };
  // display only success message if signup successful
  if (success) {
    return (
      <div>
        <Paper elevation={6} className={classes.signupstack}>
          <h2> Sign Up </h2>
          <p>Account created successfully!</p>
          <span>
            Click{" "}
            <Button onClick={handleSuccess}>
              <strong>here</strong>{" "}
            </Button>
            to get started!
          </span>
        </Paper>
      </div>
    );
  }
  return (
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
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
