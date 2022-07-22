//React and React Router
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useNavigate, Navigate } from "react-router-dom";

//Components
import ZipCodeGrab from "./ZipCodeGrab";
import MenuComponent from "./MenuComponent";
import FloatingCart from "./FloatingCart";
import FeedCardsContainer from "./FeedCardsContainer";
import Confirmation from "./Confirmation.js";

//Assets
import Cooking from "../assets/kitchen1.jpg";
//import Cooking from "../assets/cooking.jpg";

//MUI
import { Stack, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
}));

export default function Body(props) {

  const fakeResponse = {
    kitchenName: "Greg's Kitchen",
    dishes: {
      2: {
        name: "KFC",
        description: "finger licking good",
        price: 15,
        quantity: 30,
      },
      3: {
        name: "Sushi",
        description: "good stuff",
        price: 35,
        quantity: 100,
      },
    },
  };
  

  //Declare variables and state
  const classes = useStyles();
  const currentLocation = useLocation();
  const ZipCode = props.userZip;
  const UserId = props.userId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);
  const [floatCart, setfloatCart] = useState({ price: 0, dishes: {} });
  console.log('feed zipcode', ZipCode);
  useEffect(() => {
    console.log("-------------------", floatCart);
  }, [floatCart]);
  const [feedActive, setFeedActive] = useState(true);
  // define state
  const [kitchens, setKitchens] = useState({});
  const [success, setSuccess] = useState();
  const [seller_id, setSellerID] = useState(null);
  


  useEffect(() => {
    // axios to get state
    axios
      .get("/feed", {})
      .then((res) => {
        setKitchens(res.data);
      })
      .catch((error) => {
        console.log(`error in getting kitchen's feed`);
        console.log(error);
      })
      .then(() => {
        console.log(`what's going on?`);
      });
  }, []);


  // If successfull, render component
  if (!ZipCode && !zipCodeAssigned) {
    return (
      // <Navigate to="/information" />
      <div className={classes.body}>
        <ZipCodeGrab buyerId={UserId} setZipCodeAssigned={setZipCodeAssigned} />
        <Outlet />
      </div>
    );
  }

  // if kitchens is empty, fetch isn't finished yet, so we don't want to make any decisions yet
  if (Object.keys(kitchens).length === 0) {
    console.log("zip good, fetch not complete");
    return <div>LOADING</div>;
  }

  // if zip code good and fetch complete, some part of the feed will render
  if (feedActive) {
    if (currentLocation.pathname.split("/")[2]) {
      console.log(
        "woah, you shouldnt be here --------------------------------"
      );
      return <Navigate to="/feed" replace={true} />;
    }
  }

  // if kitchens is empty, fetch isn't finished yet, so we don't want to make any decisions yet
  if (Object.keys(kitchens).length === 0) {
    console.log("zip good, fetch not complete");
    return <div>LOADING</div>;
  }

  // if zip code good and fetch complete, some part of the feed will render
  if (feedActive) {
    if (currentLocation.pathname.split("/")[2]) {
      console.log(
        "woah, you shouldnt be here --------------------------------"
      );
      return <Navigate to="/feed" replace={true} />;
    }
    console.log("FEED IS ACTIVE -----");
    return (
      <FeedCardsContainer
        setFeedActive={setFeedActive}
        kitchensFromFeed={kitchens}
        setfloatCart={setfloatCart}
        floatCart={floatCart}
        userzip={ZipCode}
        />
    );
  } else {
    console.log("Feed is inactive");
    return (
      //Display purposes only
      <div className={classes.body}>
        <MenuComponent
          setfloatCart={setfloatCart}
          floatCart={floatCart}
          userZip={props.userZip}
          setSellerID={setSellerID}
        />
        <FloatingCart
          floatCart={floatCart}
          buyer_id={UserId}
          seller_id={seller_id}
          setfloatCart={setfloatCart}
          setFeedActive={setFeedActive}
        />
        <Outlet />
      </div>
    );
  }
}
