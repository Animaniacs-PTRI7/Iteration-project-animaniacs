import React, { useEffect, useState } from 'react';
import Cooking from '../assets/cooking.jpg';
import { Outlet, Link } from 'react-router-dom';
import KitchenCard from './KitchenCards';
import moment from 'moment';

import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';


//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: "100vh",
    width: "100%",
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
  feedItem: {
    marginTop: "15px",
    width: "100%",
    padding: "5px",
    maxWidth: "800px",
    backgroundColor: "#FA8072",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

export default function FeedContainer(props) {
  const classes = useStyles();
  const ZipCode = props.userZip;
  const UserId = props.buyerId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);
  // const [kitchens, setKitchens] = useState({});

  console.log(props);
  //updating time format

  const dateFormat = (time) => {
    return moment(time, "hhmm").format("LT");
  };

  // state is updated everytime fetch is getting new stuffs
  // useEffect(() => {
  //   setKitchens(props.kitchensFromFeed);
  // }, [props.kitchensFromFeed]);
  // console.log(props);
  // define state

  // for x in props passed from feed, add component to kitchens array
  const kitchensArr = [];
  console.log(props.kitchensFromFeed);
  // console.log(props.kitchensFromFeed);
  for (let kitchenID in props.kitchensFromFeed) {
    const curKitchen = props.kitchensFromFeed[kitchenID];
    console.log(props.setfloatCart);
    if (curKitchen.market_enabled) {
      kitchensArr.push(
        <KitchenCard
          key={kitchenID}
          kitchenID={kitchenID}
          kitchenName={curKitchen.kitchen_name}
          cuisine={curKitchen.cuisine}
          timeStart={dateFormat(curKitchen.pickup_window_start)}
          timeEnd={dateFormat(curKitchen.pickup_window_end)}
          bio={curKitchen.seller_bio}
          setFeedActive={props.setFeedActive}
          // setfloatCart={props.setfloatCart}
          // floatCart={props.floatCart}
        />
      );
    }
  }

  console.log(kitchensArr);
  //Declare variables and state
  //Return back to DOM
  return (
    <div className={classes.body}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <h1> Kitchens Ready For Action! </h1>
      </div>
      <Paper
        elevation={3}
        className={classes.feedItem}
        style={{ maxHeight: '40rem', overflow: 'auto' }}
      >
        {kitchensArr}
      </Paper>
      <Outlet />
    </div>
  );
}
