const axios = require("axios");
import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import {
    Stack,
    CardContent,
    Paper,
    TextField,
    Typography,
    Button,
    Modal,
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
    const {
        userId,
        setUserId,
        setUserZip,
        setUserType,
        setIsLoggedIn,
        closeSignUpModal,
        modalSignUp,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        success,
        setSuccess,
    } = props;
    const classes = useStyles();
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
                // setEmail("");
                // setUsername("");
                // setPassword("");
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
                console.log(email, "email is");
            });
    };
    const handleSuccessSignup = (e) => {
        e.preventDefault();

        axios
            .post("/auth/login", {
                username,
                password,
                userType: "buyer",
            })
            .then((response) => {
                // if user_id sent, success
                console.log(response.data);
                if (response.data.user_id) {
                    setIsLoggedIn(true);
                    setUserType("buyer");
                    setUserZip(null);
                    setUserId(response.data.user_id);
                    document.cookie = `userId=${response.data.user_id}`;
                    document.cookie = `userZip=${response.data.zip}`;
                    document.cookie = "userType=buyer";
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
    return success ? (
        <div>
            <Paper elevation={6} className={classes.signupstack}>
                <h2> Sign Up </h2>
                <p>Account created successfully!</p>
                <span>
          Click{" "}
                    <Button onClick={handleSuccessSignup}>
                        <strong>here</strong>{" "}
                    </Button>
          to get started!
                </span>
            </Paper>
        </div>
    ) : (
        <Modal
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            open={modalSignUp}
            onClose={closeSignUpModal}
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
                            <span style={{ display: "flex", justifyContent: "center" }}>
                                <Button
                                    variant="outlined"
                                    sx={{ m: 2, fontWeight: 700 }}
                                    onClick={closeSignUpModal}
                                >
                  Cancel
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
