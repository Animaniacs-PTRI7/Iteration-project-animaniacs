import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { Stack } from '@mui/material';

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