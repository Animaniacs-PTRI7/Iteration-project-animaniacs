//React
import React, { useEffect, useState } from "react";
import axios from "axios";

//MUI
import { makeStyles } from "@mui/styles";
import { Stack, Button, Paper, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({

})
);

async function fetchOrders(url, user_id) {
    const {data} = await axios.get(url , {
        params: {
            user_id
        }
    });
    return data;
}

const OrderList = (props) => {
    const [orderData, setOrderdata] = useState(null);  
    console.log("orderList data ->", orderData);
    //on load, fetch to backend with user_id and user_type to get all orders
    const {userType, user_id} = props;


    console.log("OrderList props ->", props);

    useEffect(() => {
        const url=`http://3000/order/get${userType}orders`;
        const data = fetchOrders(url, user_id);
        setOrderdata(data);
    }, [user_id]);


    return (
        <Paper elevation={5}>
            <Typography >
            Order In Preparation
            </Typography>
            <Stack>
                <item>OrderCard</item>
                <item>OrderCard</item>
                <item>OrderCard</item>
            </Stack>

            <Typography>
            Past Orders
            </Typography>
            <Stack spacing={2}>
                <item>OrderCard</item>
                <item>OrderCard</item>
                <item>OrderCard</item>
            </Stack>
        </Paper>
    );
};

export default OrderList;