//React
import React, { useEffect, useState } from 'react';
const axios = require('axios');

//MUI
import { makeStyles } from '@mui/styles';
import { Stack, Button, Paper, Typography, Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({

  })
);

// async function fetchOrders(url, user_id) {
//   const data = await axios.get(url)
//   // const {data} = await axios.get(url , {
//   //   params: {
//   //     userId: user_id
//   //   }
//   // })
//   console.log('response data for orderlist', data);
//   return data
// }


const OrderList = (props) => {
    const [orderData, setOrderdata] = useState(null);  
    console.log('orderList data ->', orderData);
    //on load, fetch to backend with user_id and user_type to get all orders
    const {userType, userId} = props;


    console.log('userId ->', userId);

    useEffect(() => {
      const url = userType == 'seller' ? `/api/orderSales/${userId}` : `/api/orders/${userId}`;
      axios.get(url)
      .then(res => {
        console.log(res.data);
      })
      // setOrderdata(data);
    }, []);


    return (
        <Paper elevation={5}>
          <Typography >
            Order In Preparation
          </Typography>
          <Stack>
            <Box>OrderCard</Box>
          </Stack>

          <Typography>
            Past Orders
          </Typography>
          <Stack spacing={2}>
            <Box>OrderCard</Box>
          </Stack>
        </Paper>
    )
};

export default OrderList;