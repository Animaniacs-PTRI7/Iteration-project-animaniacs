//React
import React, { useState, useEffect } from 'react';

//MUI
import { makeStyles } from '@mui/styles';
import { Stack, Button, Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({

  })
);

const OrderList = (props) => {
    //on load, fetch to backend with user_id and user_type to get all orders
    return (
        <div>Here is your Order History</div>
    )
};

export default OrderList;