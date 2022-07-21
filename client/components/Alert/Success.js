import React, { useState } from "react";
import { AlertTitle, Alert, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
    alertNoti: {
      position: "relative !important",
      justifyContent: "center !important",
      top: '7rem'
    },
  }));
export const Success = (props) =>{
    const {success, handleClose} = props
    const classes = useStyles();

    return (
        <Snackbar
        open={success}
        autoHideDuration={1500}
        className={classes.alertNoti}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <AlertTitle>Success!</AlertTitle>
          Account Successfully! <strong>check it out!</strong>
        </Alert>
      </Snackbar>
    )
 
}