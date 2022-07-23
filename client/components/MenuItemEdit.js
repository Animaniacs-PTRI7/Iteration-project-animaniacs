// const axios = require('axios');
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, TextField, IconButton, Tooltip, CurrencyTextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';


//Styling
const useStyles = makeStyles((theme) => ({
    dishesContainer: {
    // flex: '0 0 100%',
    // overflowY: 'scroll',
    },
    dishRow: {
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        padding: "20px",
    },
    dishPre: {
        display: "flex",
    },
    dishStats: {
        display: "flex",
        flexGrow: 0,
        flexShrink: 1,
    },
    dishStatItem: {
        width: "60px",
        margin: "10px",
    },
    dishName: {
        flexGrow: 1,
    },
}));

export default function Body(props) {
    const classes = useStyles();

  return (
    <Paper
      elevation={2}
      className={classes.dishRow + ' dishRow'}
      key={props.dishId}
      id={props.dishId}
    >
      <div className={classes.dishPre}>
        <TextField
          required
          variant='filled'
          defaultValue={props.name}
          className={classes.dishName + ' dishName'}
          label='Dish Name'
          sx={{ m: 1 }}
          onChange={(e) =>
            props.updateDish(props.dishId, 'name', e.target.value)
          }
        />
        <div className={classes.dishStats}>
          <FormControl sx={{ m: 1, width:'15ch' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-amount"
              minimumvalue='0'
              // value={values.amount}
              defaultValue={props.price.slice(1)}
              onChange={(e) =>
                props.updateDish(props.dishId, 'price', e.target.value)
              }
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Price"
            />
          </FormControl>
          
          <TextField
            required
            type='number'
            defaultValue={props.quantity}
            className={classes.dishStatItem + ' dishQty'}
            label='Qty'
            sx={{ m: 1 }}
            onChange={(e) =>
              props.updateDish(props.dishId, 'quantity', e.target.value)
            }
          />
          <Tooltip title='Delete Dish'>
            <IconButton
              onClick={() => {
                props.deleteDish(props.dishId);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <TextField
        defaultValue={props.description}
        className={classes.dishDesc + ' dishDesc'}
        //   variant='filled'
        label='Extended description'
        sx={{ m: 1 }}
        multiline
        minRows={1}
        maxRows={3}
        onChange={(e) =>
          props.updateDish(props.dishId, 'description', e.target.value)
        }
      />
    </Paper>
  );
}
