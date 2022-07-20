import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";
//import Cooking from "../assets/cooking.jpg";
import Cooking from "../assets/kitchen.jpg";
import { Stack, Button ,Modal} from "@mui/material";

import SignUp from "./SignUp";
import Login from "./Login";

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
  bottomText: {
    fontSize: "25px",
    position: "absolute",
    bottom: "0",
    left: "20px",
    color: "white",
  },
  textLink: {
    color: "red",
  },
}));

export default function Body(props) {
  // const {setIsLoggedIn,setModalSignUp,modalSignUp} = props;
  //Declare variables and state
  const {setIsLoggedIn} = props;
  const classes = useStyles();
  const [randomGreeting, setGreeting] = useState("");
  const [modalSignUp, setModalSignUp] = useState(false);
  const [modalLogIn, setModalLogin] = useState(false);

  useEffect(() => {
    // choose welcome text
    const greetings = [
      "cooking is",
      "banana bread is",
      "world famous meatballs are",
      "apple pie is",
      "ravioli is",
      "soul food is",
      "[ insert yummy food here ] is",
    ];

    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);


  //Return back to DOM
  return (
    <div className={classes.body}>
      <h1 className={classes.heavyFont}>
        {`Grandma's ${randomGreeting} just a button press away`}
      </h1>
      <div>
        <Button
          data-testid="login-button"
          onClick={()=>setModalSignUp(true)}
          // component={Link}
          // to="/signup"
          variant="contained"
          color="primary"
          sx={{ m: 2 ,fontWeight : 700}}
        >Sign up
        </Button>
        <Button
          data-testid="login-button"
          onClick={()=>setModalLogin(true)}
          component={Link}
          to="/login"
          variant="contained"
          color="secondary"
          sx={{ m: 2 ,fontWeight : 700}}    
        >
          Login
        </Button>
      </div>
      <Outlet />
      <div>
        <p className={classes.bottomText}>
          Already a seller or want to become one? Click{" "}
          <Link className={classes.textLink} to="/seller" data-testid="link-1">
            here
          </Link>
        </p>
      </div>
      {modalSignUp?<SignUp setModalSignUp={setModalSignUp}  modalSignUp={modalSignUp}/> : null }
      {modalLogIn ? 
      <Login setModalLogin={setModalLogin}  modalLogIn={modalLogIn} setIsLoggedIn={setIsLoggedIn} setUserType={setUserType}/>  
      :null}
    </div>
  );
}
