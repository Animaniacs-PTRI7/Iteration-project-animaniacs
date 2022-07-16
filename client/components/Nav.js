//React and React-Router
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

//MUI
// import { fontWeight } from '@mui/system';
// import { SortIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { AppBar, IconButton, Toolbar, Tooltip, Zoom, Grid } from '@mui/material';
import DiningIcon from '@mui/icons-material/LocalDining';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const background = document.getElementById("app")
console.log(background, 'This is the background')
let logOutIconElement;
let myAccountIconElement;


const useStyles = makeStyles((theme) => ({
  appbar: {
    fontFamily: 'Lato',
  },
  appbarHead: {
    flexGrow: '1',
  },
  appbarWrap: {
    width: '100%',
    margin: '0 auto',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  icon: {
    display: 'grid',
    
    color: 'black',
    margin: '10px',
    // fontSize: '4rem',
  },
  logoBlack: {
    color: '#2c3e50',
    fontWeight: '500',
    textDecoration: 'none',
  },
  logoRed: {
    color: '#e74c3c',
    fontWeight: '300',
  },
  noUnderline: {
    textDecoration: 'none',
    // color: 'unset',
  },

  iconGroup: {

  }
}));


//Todo build My orders Icon for Seller and User.
export default function Nav(props) {
  const classes = useStyles();
  // const logOutIconElement;
  // const myAccountIconElement


  // if logout has been passed, it means we're signed in
  if (props.logOut) {
    logOutIconElement = (
      
      <div id="iconGroup">
        <Tooltip title={<h2 style={{ color: 'white' }}>Log Out</h2>} TransitionComponent={Zoom}>

          {/* Log Out Icon */}
          <IconButton onClick={props.logOut}>
            <LogoutIcon sx={{ fontSize: 33 }} className={classes.icon}/>
          </IconButton>

        </Tooltip>

{/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg> */}


        <Tooltip title={<h2 style={{ color: 'white' }}>My Orders</h2>} TransitionComponent={Zoom}>
          
           {/* My Orders Icon */}
          <IconButton component={Link} to='/MyOrders'>
          </IconButton>

        </Tooltip>
      </div>
    )
    // if seller
    if (props.userType === 'seller')
      myAccountIconElement = (

        <div id="iconGroup">

        <Tooltip title={<h2 style={{ color: 'white' }}>My Kitchen</h2>} TransitionComponent={Zoom}>


          <IconButton component={Link} to='/MyKitchen'>
            <RestaurantMenuIcon sx={{ fontSize: 33 }} className={classes.icon}/>
          </IconButton>


        </Tooltip>
        </div>
      );
    else
      myAccountIconElement = (

        <Tooltip title={<h2 style={{ color: 'white' }}>My Account</h2>} TransitionComponent={Zoom}>
          
          <IconButton component={Link} to='/'>
            <ManageAccountsIcon sx={{ fontSize: 33 }} className={classes.icon}/>
          </IconButton>

        </Tooltip>
      );
  }

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrap}>
          <Link to='/' className={classes.noUnderline}>
            <h1 className={classes.appbarHead}>
              <span className={classes.logoBlack}>Only</span>
              <span className={classes.logoRed}>Pans</span> <DiningIcon />
            </h1>
          </Link>
          <div>
          {myAccountIconElement}
          {logOutIconElement}
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}