//React and React-Router
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

//MUI
// import { fontWeight } from '@mui/system';
// import { SortIcon } from '@mui/icons-material';
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Zoom,
  Grid,
} from "@mui/material";
import DiningIcon from "@mui/icons-material/LocalDining";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

const background = document.getElementById("app");
console.log(background, "This is the background");
let logOutIconElement;
let myAccountIconElement;

const useStyles = makeStyles((theme) => ({
  appbar: {
    fontFamily: "Lato",
  },
  appbarHead: {
    flexGrow: "1",
  },
  appbarWrap: {
    width: "100%",
    margin: "0 auto",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  icon: {
    display: "grid",
    color: "black",
    // margin: '10px',
  },
  logoBlack: {
    color: "#2c3e50",
    fontWeight: "500",
    textDecoration: "none",
  },
  logoRed: {
    color: "#e74c3c",
    fontWeight: "300",
  },
  noUnderline: {
    textDecoration: "none",
  },
}));

export default function Nav(props) {
  const classes = useStyles();

  // if logout has been passed, it means we're signed in
  if (props.logOut) {
    logOutIconElement = (
      <Tooltip
        title={<h2 style={{ color: "white" }}>Log Out</h2>}
        TransitionComponent={Zoom}
      >
        <IconButton onClick={props.logOut}>
          <LogoutIcon sx={{ fontSize: 33 }} className={classes.icon} />
        </IconButton>
      </Tooltip>
    );
    // if seller
    if (props.userType === "seller")
      myAccountIconElement = (
        <div id="iconGroup1">
          <Tooltip
            title={<h2 style={{ color: "white" }}>My Orders</h2>}
            TransitionComponent={Zoom}
          >
            <IconButton component={Link} to="/MyOrders">
              <ArticleOutlinedIcon
                sx={{ fontSize: 33 }}
                className={classes.icon}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={<h2 style={{ color: "white" }}>My Kitchen</h2>}
            TransitionComponent={Zoom}
          >
            <IconButton component={Link} to="/MyKitchen">
              <RestaurantMenuIcon
                sx={{ fontSize: 33 }}
                className={classes.icon}
              />
            </IconButton>
          </Tooltip>
          {logOutIconElement}
        </div>
      );
    else
      myAccountIconElement = (
        <div>
          <Tooltip
            title={<h2 style={{ color: "white" }}>My Orders</h2>}
            TransitionComponent={Zoom}
          >
            <IconButton component={Link} to="/MyOrders">
              <ArticleOutlinedIcon
                sx={{ fontSize: 33 }}
                className={classes.icon}
              />
            </IconButton>
          </Tooltip>
          {logOutIconElement}
        </div>
      );
  }

  return (
    <div data-testid="nav-1">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrap}>
          <Link to="/" className={classes.noUnderline}>
            <h1 className={classes.appbarHead}>
              <span className={classes.logoBlack}>Only</span>
              <span className={classes.logoRed}>Pans</span> <DiningIcon />
            </h1>
          </Link>
          <div>{myAccountIconElement}</div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
