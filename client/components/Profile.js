import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import  ProfileCard  from './ProfileCard'
import "../styles.scss";

const PopupDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const PopupDialogTitle = (props) => {
  const { children, onClose, ...other } = props;


  return (
    <PopupDialog sx={{ 
      position: "relative",
      marginLeft: "10rem",
      width: "50%",
      height: "auto"}} {...other}>
      {children}
      <img className="websiteLogo" src={logo} />
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#BBD1D1',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </PopupDialog>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ProfilePopup() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="inherit" sx={{ flexGrow: 1 }}>
      <Typography
          variant="h6"
          component="div"
          sx={{
            textTransform: "none",
            fontWeight: "light",
            color: "#36454F",
          }}>
          My Profile
        </Typography>
      </Button>
      <PopupDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <PopupDialogTitle id="customized-dialog-title" onClose={handleClose}>
          
        </PopupDialogTitle> 
         <DialogContent dividers> 
          <ProfileCard />
        </DialogContent>
      </PopupDialog>
    </div>
  );
}