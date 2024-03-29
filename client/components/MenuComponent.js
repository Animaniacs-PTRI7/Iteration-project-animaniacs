import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';


import { makeStyles } from '@mui/styles';
import { Stack, Button, Paper } from '@mui/material';

import MenuItem from './MenuItem';

import moment from 'moment';
import Mappy from './mappy';


const useStyles = makeStyles((theme) => ({
  papermain: {
    width: '50%',
    padding: '10px 0px 0px 10px',
    margin: '10px 0px 20px 10px',
  },
  stack: {
    padding: '0px 10px',
  },
  paperbody: {
    width: '650px',
    width: '50%',
    // backgroundColor: '#ecf0f1',
    margin: '10px',
  },
  nestedBody: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
  },
}));

const dateFormat = (time) => {
  return moment(time, 'hhmm').format('LT');
};

const destructure = (object, props) => {
  const menuUnit = [];
  for (const key in object) {
    const element = object[key];
    console.log(object);
    menuUnit.push(
      <MenuItem
        key={key}
        dishId={key}
        name={element.name}
        description={element.description}
        price={element.price}
        quantity={element.quantity}
        setfloatCart={props.setfloatCart}
        floatCart={props.floatCart}
      />
    );
  }
  return menuUnit;
};
export default function MenuComponent(props) {

  console.log('sup im the menu component');
  const { sellerId } = useParams();
  const classes = useStyles();
  const [restaurantName, setRestaurantName] = useState('');
  const [dishes, setDishes] = useState({});
  const [street, setStreet] = useState('');
  const [pickupStart, setPickupStart] = useState('');
  const [pickupEnd, setPickupEnd] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapStats, setMapStats] = useState({});

  props.setSellerID(sellerId);
  
  useEffect(() => {
    // so now we fetch!
    axios.post('db/getmenu', { sellerId }).then((res) => {
      console.log(res.data);
      setDishes(res.data.dishes);
      setRestaurantName(res.data.kitchenName);
      setStreet(res.data.address.seller_street_name);
      setStreet(res.data.seller_street_name);
      setPickupStart(res.data.pickup_window_start); // pickup_window_start
      setPickupEnd(res.data.pickup_window_end);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) return <div></div>;

  console.log(restaurantName, dishes, street);

  return (
    <Paper className={classes.paperbody}>
      <Stack className={classes.papermain}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <h1>{restaurantName}</h1>
          
          {/* <span style={{ height: '250px', width: '600px' }}>
            <Mappy
              sellerAddr={street}
              buyerAddr={String(props.userZip)}
              setMapStats={setMapStats}
            />
          </span>
          <span style={{ fontSize: '16px', paddingTop: '5px' }}>
            {mapStats.duration
              ? `Trip Duration ⏲: ${mapStats.duration.text} | Trip Distance 🚗: ${mapStats.distance.text}`
              : ''}
          </span> */}
          
          <h3>{`Pickup Window: ${dateFormat(pickupStart)} - ${dateFormat(
            pickupEnd
          )}`}</h3>
        </div>
        {/* <span>{street}</span> */}
      </Stack>
      <div>{destructure(dishes, props)}</div>
    </Paper>
  );
}