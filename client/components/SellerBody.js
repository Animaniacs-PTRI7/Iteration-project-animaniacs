//React and Router
import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

//MUI
import { makeStyles } from "@mui/styles";
import { Button, AlertTitle, Alert, Snackbar } from "@mui/material";
import SellerSignUp from "./SellerSignUp";
import SellerLogin from "./SellerLogin";
import {Success} from "./Alert/Success";
import {ErrorAlert} from "./Alert/Error";
//Assets
//import Doughy from '../assets/doughy.jpg';
import Cooking from "../assets/kitchen1.jpg";
//Styling
const useStyles = makeStyles((theme) => ({
    body: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
        backgroundSize: "cover",
        backgroundRepeat: "none",
        backgroundColor: "transparent",
        padding: "0px 20px",
    },
    heavyFont: {
        color: "white",
        fontWeight: "900",
        fontSize: "40px",
        fontFamily: "Nunito",
    },
    buttonNest: {
        display: "flex",
        margin: "0px 10px",
    },
    alertNoti: {
        position: "relative !important",
        justifyContent: "center !important",
    },
}));

export default function SellerBody(props) {
    //Declare variables and state
    const classes = useStyles();
    const { setIsLoggedIn, setUserType, setUserId, setUserZip } = props;
    const [signUp, setSignUp] = useState(false);
    const [logIn, setLogin] = useState(false);
    const [modalSignUp, setModalSignUp] = useState(false);
    const [modalLogIn, setModalLogin] = useState(false);
    const [success, setSuccess] = useState(false);
    const [randomGreeting, setGreeting] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
    // choose welcome text
        const greetings = [
            "What's cookin'?",
            "A chef, are you?",
            "Anyone can cook!",
            "Beans, greens, tomatos, potatos...",
            "Please wash your hands!",
            "Hello, undiscovered talent!",
            "Oh, you're a creator of delectible comestibles too?",
            "Always good to see someone so in tune with the culinary arts.",
            "Oh! It's you! It must be our lucky day.",
        ];

        setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }, []);

    const openSignUpModal = () => setModalSignUp(true);
    const closeSignUpModal = () => setModalSignUp(false);

    const openLoginModal = () => setModalLogin(true);
    const closeLoginModal = () => setModalLogin(false);
    console.log("success-->", success);
    const handleClose = () => setSuccess(false);
    const handleCloseError = () => setError(false);
    //Return back to DOM
    return (
        <>
            {error? <ErrorAlert error={error} handleCloseError={handleCloseError}/> : null }
            {success ? <Success success={success} handleClose={handleClose}/>:  null }
            <div className={classes.body}>
                <>
                    <h1 className={classes.heavyFont}> {randomGreeting}</h1>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ m: 2, fontWeight: 700 }}
                            onClick={openSignUpModal}
                        >
                Sign up
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ m: 2, fontWeight: 700 }}
                            onClick={openLoginModal}
                        >
                Login
                        </Button>
                    </div>
                    <Outlet />
                </>
                {modalSignUp ? (
                    <SellerSignUp
                        setModalSignUp={setModalSignUp}
                        showSignUp={modalSignUp}
                        closeSignUpModal={closeSignUpModal}
                        setSuccess={setSuccess}
                        setError={setError}
                    />
                ) : null}
                {modalLogIn ? (
                    <SellerLogin
                        closeLoginModal={closeLoginModal}
                        showLogIn={modalLogIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setUserType={setUserType}
                        setUserZip={setUserZip}
                        setUserId={setUserId}
                        setSuccess={setSuccess}
                        setError={setError}
                    />
                ) : null}
            </div>
        </>
    
    );
}
