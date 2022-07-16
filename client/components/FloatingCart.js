import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import { PropaneSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import { Stack, Button, Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    top: '0',
    margin: '10% 0',
    width: '300px',
    height: '85%',
    right: '0',
    padding: '10px',
    zIndex: '-1px',
    marginTop: '120px',
    marginRight: '30px',
  },
}));

export default function FloatingCart(props) {
  const classes = useStyles();

  const navigate = useNavigate();

  const submitOrder = () => {
    const body = {
      buyer_id,
      seller_id,
      dishes
    }
    //post to backend
    axios
    .post('http:localhost:3000/createOrder', body)
    .then(res => {
      console.log(res);
      //send an confirmation message in popup. //On confirmation, reset card and floatcart and back to feedpage.
      props.setFeedActive(true);
      props.setfloatCart({ price: 0, dishes: {}});
    })
    .catch(err => {
      console.log(err);
    })
  }


  const checkout = () => {
    axios
      .post('/checkout', {
        dishes: props.floatCart.dishes,
      })
      .then((res) => {
        window.location.assign(res.data.url);
        //navigate(res.data.url);
        // console.log(res);
      });
  };

  //grab dishes from props
  const { floatCart, seller_id, buyer_id } = props;
  const { dishes } = floatCart;
  console.log('float cart props', props);
  console.log('float cart dishes', dishes);

  const dishdisplay = [];

  if (Object.keys(dishes).length > 0) {
    for (const x in dishes) {
      dishdisplay.push(
        <div key={x}> 
          <p>`{dishes[x].name}: {dishes[x].quantity}` </p>
        </div>
    )}
  };


  return (
    <div>
      <Paper className={classes.footer}>
        <Stack>
          <h1>${props.floatCart.price}</h1>
          <h3> Current Cart: </h3>
          {dishdisplay}
          <Button color='primary' onClick={checkout}>
            Checkout
          </Button>
          <Button color='primary' onClick={submitOrder}>
            Submit Order
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}