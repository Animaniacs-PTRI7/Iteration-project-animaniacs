import React, { useEffect, useState } from 'react';
import Orderdishes from './Orderdishes';
import axios from 'axios';

import  { Button, Stack, Card, Grid, Checkbox, FormControlLabel } from '@mui/material';


const OrderCard = (props) => {

    const [display, setDisplay] = useState(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleUpdate = (e) => {
        axios.post('api/update-order', {
            order_id: props.order_id,
            fulfilled: props.status
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        console.log('clicked!')
    }
    
    return (
        <Stack spacing={3} sx={{width: "80%"}}>
            <Card variant="outlined" onClick={() => setDisplay(display ? false : true)} sx={{height: '7em', backgroundColor: '#A4DDED', fontWeight: '500', borderRadius: '10px', m: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <p>Order #: <b>{props.order_id}</b>.    Order Date: <b>{props.order_date}</b></p>
                        <p><b>{props.kitchen_name}</b>. Address: {props.address}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p>Total Price:</p>
                        <p><b>${props.total}</b></p>
                    </Grid>
                    <Grid item xs={2}>
                        <p></p>
                        {props.status ?  <FormControlLabel
                                            value="picked up"
                                            control={<Checkbox disabled checked/>}
                                            label="picked up"
                                            labelPlacement="start"
                                            /> : <FormControlLabel
                                                    value="picked up"
                                                    control={<Checkbox onChange={handleUpdate}/>}
                                                    label="picked up"
                                                    labelPlacement="start"
                                                    />
                            
                        }
                    </Grid>
                </Grid>
            </Card>
            { display ? <Orderdishes dishes={props.dishes}/> : null}
        </Stack>
    )
};

export default OrderCard;