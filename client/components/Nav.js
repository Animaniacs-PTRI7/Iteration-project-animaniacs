import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Tooltip, Zoom } from '@material-ui/core';
import DiningIcon from '@material-ui/icons/LocalDining';
import { Outlet, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appbar: {
    color: 'red',
    backgroundColor: 'white',
    fontFamily: 'Lato',
  },
  appbarHead: {
    flexGrow: '1',
  },
  appbarWrap: {
    width: '90%',
    margin: '0 auto',
    justifyContent: 'space-between',
  },
  icon: {
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
    color: 'unset',
  },
}));


//Todo build My orders Icon for Seller and User.
export default function Nav(props) {
  const classes = useStyles();


  // if logout has been passed, it means we're signed in
  if (props.logOut) {
      <div>
        <Tooltip
          title={<h2 style={{ color: 'white' }}>Log Out</h2>}
          TransitionComponent={Zoom}
        >
          <IconButton onClick={props.logOut}>
          </IconButton>
        </Tooltip>
        <Tooltip
          title={<h2 style={{ color: 'white' }}>My Orders</h2>}
          TransitionComponent={Zoom}
        >
          <IconButton component={Link} to='/MyOrders'>
          </IconButton>
        </Tooltip>
      </div>

  //   // if seller
  //   if (props.userType === 'seller')
  //     myAccountIconElement = (
  //       <Tooltip
  //         title={<h2 style={{ color: 'white' }}>My Kitchen</h2>}
  //         TransitionComponent={Zoom}
  //       >
  //         <IconButton component={Link} to='/MyKitchen'>

  //         </IconButton>
  //       </Tooltip>
  //     );
  //   else
  //     myAccountIconElement = (
  //       <Tooltip
  //         title={<h2 style={{ color: 'white' }}>My Account</h2>}
  //         TransitionComponent={Zoom}
  //       >
  //         <IconButton component={Link} to='/'>
  //         </IconButton>
  //       </Tooltip>
  //     );
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

          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
