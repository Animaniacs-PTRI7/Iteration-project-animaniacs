const axios = require("axios");
import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import { PropaneSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { makeStyles } from "@mui/styles";
import { Stack, Button, Paper } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51LN5nMJJE4t2soutfWOdeAtwrGeHCpf4fBkYr2tOEUuk8iNOkca0eRa6XqEF9jhFE1rniLd0rLdJXx5S4doq193S00qwUg3PZi"
);

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    top: "0",
    margin: "10% 0",
    width: "300px",
    height: "85%",
    right: "0",
    padding: "10px",
    zIndex: "-1px",
    marginTop: "120px",
    marginRight: "30px",
  },
}));

export default function FloatingCart(props) {
  const classes = useStyles();

  const navigate = useNavigate();

  const submitOrder = () => {
    //post to backend
    axios
      .post("/api/create-order", {
        buyer_id,
        seller_id,
        dishes,
      })
      .then((res) => {
        console.log(res);
        //send an confirmation message in popup. //On confirmation, reset card and floatcart and back to feedpage.
        props.setFeedActive(true);
        props.setfloatCart({ price: 0, dishes: {} });
        navigate("/confirmation", { state: res });
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  };

  const checkout = () => {
    console.log(props.floatCart.dishes, "Here are the dishes");
    axios
      .post("/checkout", {
        dishes: props.floatCart.dishes,
      })
      .then((res) => {
        console.log(res, "Respons for checkout");
        console.log(res.data.url);
        window.location.assign(res.data.url);
      });
    // return (
    //   <Elements stripe={stripePromise} options={options}>
    //     <CheckoutForm />
    //   </Elements>)
  };

  //grab dishes from props
  const { floatCart, seller_id, buyer_id } = props;
  const { dishes } = floatCart;
  console.log("float cart props", props);
  console.log("float cart dishes", dishes);

  const dishdisplay = [];

  if (Object.keys(dishes).length > 0) {
    for (const x in dishes) {
      dishdisplay.push(
        <div key={x}>
          <p>
            `{dishes[x].name}: {dishes[x].quantity}`{" "}
          </p>
        </div>
      );
    }
  }

  return (
    <div>
      <Paper className={classes.footer}>
        <Stack>
          <h1>${props.floatCart.price}</h1>
          <h3> Current Cart: </h3>
          {/* {dishdisplay} */}
          <Button color="primary" onClick={checkout}>
            Checkout
          </Button>
          <Button color="primary" onClick={submitOrder}>
            Submit Order
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
