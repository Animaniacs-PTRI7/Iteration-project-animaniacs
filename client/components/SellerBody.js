//React and Router
import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

//MUI
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import SellerSignUp from "./SellerSignUp";
import SellerLogin from "./SellerLogin";
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
}));

export default function SellerBody(props) {
  //Declare variables and state
  const classes = useStyles();
  const {setIsLoggedIn,setUserType,setUserId,setUserZip} = props;
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogin] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalLogIn, setModalLogin] = useState(false);

  const [randomGreeting, setGreeting] = useState("");
  let signUpModule;

  //Sign-up Card Display Function
  const signUpFunc = (action) => {
    if (action == "sign") {
      console.log("Button Clicked, sign up was ", signUp);
      setSignUp(!signUp);
      console.log("Sign up is now ", signUp);
    } else {
      setLogin(!logIn);
    }
  };

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

  if (signUp) {
    //signUpModule = <SignUp />;
  }

  if (logIn) {
    //signUpModule = <Login />;
  }

  //Return back to DOM
  return (
    <div className={classes.body}>
      <h1 className={classes.heavyFont}> {randomGreeting}</h1>
      {signUpModule}
      <div>
        <Button
        //  component={Link}
        //  to="/seller/signup"
          variant="contained"
          color="primary"
          sx={{ m: 2, fontWeight: 700 }}
          onClick={()=>setModalSignUp(true)}
        >
          Sign up
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 2, fontWeight: 700 }}
          onClick={()=>setModalLogin(true)}
        >
          Login
        </Button>
      </div>
      <Outlet />
      {modalSignUp ? (
        <SellerSignUp showSignUp={modalSignUp} setShowSignUp={setModalSignUp} />
      ) : null}
      {modalLogIn ? (
        <SellerLogin 
        setModalLogin={setModalLogin}  
        showLogIn={modalLogIn} 
        setIsLoggedIn={setIsLoggedIn}
        setUserType={setUserType}
        setUserZip={setUserZip}
        setUserId={setUserId}
         />
      ) : null}
    </div>
  );
}
