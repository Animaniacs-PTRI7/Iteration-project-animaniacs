//React
import React, { useEffect, useState } from 'react';
const axios = require('axios');
import OrderCard from './OrderCard';

//MUI
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';


//theme from feed container
const useStyles = makeStyles((theme) => ({
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: "cover",
    backgroundRepeat: "none",
    backgroundColor: "transparent",
    paddingTop: "100px"
  },
}));


const OrderList = (props) => {
    const classes = useStyles();
    const [orderData, setOrderdata] = useState([]);  
    // console.log('orderList data ->', orderData);
    //on load, fetch to backend with user_id and user_type to get all orders
    const {userType, userId} = props;

    // console.log("OrderList props ->", props);

    // console.log('userId ->', userId);

    useEffect(() => {
      const url = userType == 'seller' ? `/api/orderSales/${userId}` : `/api/orders/${userId}`;
      axios.get(url)
      .then(res => {
        // console.log(res.data);
        setOrderdata(res.data);
      })
    }, []);

    // const fulfilled = orderData.length > 0 ? orderData.filter( obj => {
    //   return obj.fulfilled == true
    // }) : [];

    // console.log('fulfilled', fulfilled);

    const ffOrders = [];
    const uffOrders = [];
    if (orderData.length > 0) {
      orderData.forEach(el => {
        if (el.fulfilled) {
          ffOrders.push(<OrderCard 
                          key={el.pk_order_id} 
                          dishes={el.dishes} 
                          order_id={el.pk_order_id} 
                          order_date={el.order_date.slice(0,10)}
                          total={el.total} 
                          status={el.fulfilled} 
                          kitchen_name={el.kitchen_name}
                          address={el.seller_street_name + ', ' + el.seller_city + ', ' + el.seller_state + ', ' + el.seller_zip_code}
                          />
          )
        } else {
          uffOrders.push(<OrderCard 
                          key={el.pk_order_id} 
                          dishes={el.dishes} 
                          order_id={el.pk_order_id} 
                          order_date={el.order_date.slice(0,10)}
                          total={el.total} 
                          status={el.fulfilled} 
                          kitchen_name={el.kitchen_name}
                          address={el.seller_street_name + ', ' + el.seller_city + ', ' + el.seller_state + ', ' + el.seller_zip_code}
                          />
          )
        }
      })
    }
    console.log('fulfilled', ffOrders);
    console.log('unfulfilled', uffOrders);

    // for (let i = 0; i < fulfilled.length; i++) {
    //   ffOrders.push(<OrderCard 
    //                   key={fulfilled[i].pk_order_id} 
    //                   dishes={fulfilled[i].dishes} 
    //                   order_id={fulfilled[i].pk_order_id} 
    //                   order_date={fulfilled[i].order_date.slice(0,10)}
    //                   total={fulfilled[i].total} 
    //                   status={fulfilled[i].fulfilled} 
    //                   kitchen_name={fulfilled[i].kitchen_name}
    //                   address={fulfilled[i].seller_street_name + ', ' + fulfilled[i].seller_city + ', ' + fulfilled[i].seller_state + ', ' + fulfilled[i].seller_zip_code}
    //                   />)
    // }

    // const unfulfilled = orderData.length > 0 ? orderData.filter( obj => {
    //   return obj.fulfilled == false
    // }) : [];

    // for (let i = 0; i < unfulfilled.length; i++) {
    //   ffOrders.push(<OrderCard 
    //                   key={unfulfilled[i].pk_order_id} 
    //                   dishes={unfulfilled[i].dishes} 
    //                   order_id={unfulfilled[i].pk_order_id} 
    //                   order_date={unfulfilled[i].order_date.slice(0,10)} 
    //                   status={unfulfilled[i].fulfilled} 
    //                   total={unfulfilled[i].total}
    //                   kitchen_name={unfulfilled[i].kitchen_name}
    //                   address={unfulfilled[i].seller_street_name + ', ' + unfulfilled[i].seller_city + ', ' + unfulfilled[i].seller_state + ', ' + unfulfilled[i].seller_zip_code}
    //                   />)
    // }


    return (
      <div className={classes.body}>
        <Box sx={{width:'80%'}}>
          <h3> Current Orders </h3>
          <div>
            {uffOrders}
          </div>
        </Box>

        <Box sx={{width:'80%'}}>
          <h3> Past Orders </h3>
          <div>
            {ffOrders}
          </div>
        </Box>
      </div>
    )
};

export default OrderList;
