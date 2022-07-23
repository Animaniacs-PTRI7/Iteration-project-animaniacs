import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "500px",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  foodPicture: {
    display: "flex",
    position: "relative",
    width: "100px",
    left: "60px",
    bottom: "25px",
    height: "10px",
    borderRadius: "100px",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal(props) {
  const classes = useStyles();
  // e.preventDefault()
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // axios
  // .post( , {
  //   kitchenName: kitchen_name,
  //   nickname: seller_nickname,
  //   bio: seller_bio,
  // },
  // )
  // .then((res) => {
  //   console.log("response from profile acios:", res)
  // })
  // .catch((err) => console.log(err))

  return (
    <div>
      <Avatar
        onClick={handleOpen}
        src="https://i.imgur.com/TxwoKaa.png"
        sx={{ width: 75, height: 75 }}
        className={classes.foodPicture}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
