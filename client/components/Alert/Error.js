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
export const ErrorAlert = (props) =>{
    const {error, handleCloseError} = props
    const classes = useStyles();

    return (
    <Snackbar
        open={error}
        autoHideDuration={1500}
        className={classes.alertNoti}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          <AlertTitle>Error!</AlertTitle>
          Something went wrong! <strong>check it out!</strong>
        </Alert>
      </Snackbar>
    )
 
}