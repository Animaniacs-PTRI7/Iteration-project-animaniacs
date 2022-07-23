import React, { useEffect, useState } from "react";
import Cooking from "../assets/cooking.jpg";
import { Outlet } from "react-router-dom";
import KitchenCard from "./KitchenCards";
import moment from "moment";

import { makeStyles } from "@mui/styles";
import { Paper, TextField, Button, Alert, AlertTitle } from "@mui/material";

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
  const zipcode = props.userzip;
  const UserId = props.buyerId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);
  const [zipbuilder, setZipbuilder] = useState(null);
  const [zipsearch, setZip] = useState(zipcode);

  const dateFormat = (time) => {
    return moment(time, "hhmm").format("LT");
  };

  // for x in props passed from feed, add component to kitchens array
  const kitchensArr = [];
  console.log(props.kitchensFromFeed);

  for (let kitchenID in props.kitchensFromFeed) {
    const curKitchen = props.kitchensFromFeed[kitchenID];
    console.log(props.setfloatCart);
    if (
      curKitchen.market_enabled &&
      curKitchen["seller_zip_code"] == zipsearch
    ) {
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
        />
      );
    }
  }

  const handleZip = (e) => {
    setZip(zipbuilder);
  };
  const handleClear = (e) => {
    setZip(zipcode);
  };

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
        <h1>
          Kitchens In Zipcode: <strong>{zipsearch}</strong>
        </h1>
      </div>
      <Paper
        elevation={3}
        className={classes.feedItem}
        style={{ maxHeight: "40rem", overflow: "auto" }}
      >
        {kitchensArr.length > 0 ? (
          kitchensArr
        ) : (
          <Alert severity="error">
            <AlertTitle>Sorry!</AlertTitle>
            No Cooks in this Area at this time!
          </Alert>
        )}
        {/* Sorry! No Cooks in this Area at this time! */}
      </Paper>
      <div id="zipsearch">
        <form>
          <TextField
            label="Search by Zipcode"
            sx={{ backgroundColor: "white", marginTop: "5px" }}
            variant="filled"
            // required
            onChange={(e) => setZipbuilder(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ m: 2, fontWeight: 700 }}
            onClick={handleZip}
          >
            Search
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ m: 2, fontWeight: 700 }}
            onClick={handleClear}
          >
            Go To Hometown Zipcode
          </Button>
        </form>
      </div>
      <Outlet />
      <Outlet />
    </div>
  );
}
