import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    paperbody: {
        marginTop: "50%",
        width:"50em"
    },
}));
export default function (props) {
    console.log("i got to Confirmation page");
    const classes = useStyles();
    let success = props.success;

    //grab data from Navigate
    const location = useLocation();
    console.log(location);

    // const { kitchen_name, order_id } = location.state;
    //fake data
    const kitchen_name = "Joy Kitchen";
    const order_id = 128;

    // if (success) {
    return (
        <div>
            <Paper className={classes.paperbody}>
                <p> Your order to the <b>{kitchen_name}</b> has been accepted.</p>
                <p> Your order # is <b>{order_id}.</b></p>
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