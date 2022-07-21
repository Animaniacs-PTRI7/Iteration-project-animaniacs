import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  paperbody: {
    margin: '10%',
    padding: '10%',
    width:'70%'
  },
}));
export default function (props) {
  console.log('i got to Confirmation page');
  const classes = useStyles();
  // let success = props.success;

  //grab data from Navigate
  const location = useLocation();
  // console.log(location);

  const { kitchen_name, order_id, price } = location.state;
  //fake data
  // const kitchen_name = 'Joy Kitchen';
  // const order_id = 128;

  // if (success) {
    return (
      <div>
        <Paper elevation={2} className={classes.paperbody} sx={{ fontSize: 20, fontWeight: 'medium', borderRadius: 2} }>
          <p> Your order to the <b>{kitchen_name}</b> has been accepted.</p>
          <p> Your order # is <b>{order_id}.</b></p>
          <p> Your order total is <b>{price}.</b></p>
        </Paper>
      </div>
    );
}
//   } else {
//     return (
//       <div>
//         <Paper>
//           <h2>Looks like your order hit a snag! Try again</h2>
//         </Paper>
//       </div>
//     );
//   }
// }