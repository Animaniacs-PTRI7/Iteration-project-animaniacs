import React, { useEffect, useState } from 'react';
import Orderdishes from './Orderdishes';

import  { Button, Stack, Grid, Checkbox } from '@mui/material';


const OrderCard = (props) => {

    const [display, setDisplay] = useState(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleUpdate = (e) => {
        console.log('clicked!')
    }
    
    return (
        <Stack spacing={1} sx={{width: "60%"}}>
            <Button variant="contained" onClick={() => setDisplay(display ? false : true)} sx={{height: '7em'}}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <p>Order #: {props.order_id}.    Order Date: {props.order_date}</p>
                        <p>Kitchen Name, Kitchen Address</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p>Picked Up</p>
                        <Checkbox {...label} onChange={handleUpdate} sx={{m:1}}/>
                    </Grid>
                </Grid>
            </Button>
            { display ? <Orderdishes dishes={props.dishes}/> : null}
        </Stack>
    )
};

export default OrderCard;