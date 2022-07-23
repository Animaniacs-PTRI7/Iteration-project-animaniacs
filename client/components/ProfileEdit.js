import React, {useState} from 'react'
import axios from "axios";
import { ConstructionOutlined } from '@mui/icons-material';
import { makeStyles } from "@mui/styles";
import Cooking from "../assets/kitchen1.jpg";
import { Stack, Button, Box, CardContent, Paper, TextField, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: "cover",
    backgroundRepeat: "none",
    backgroundColor: "transparent",
    padding: "0px 20px",
  },
  heavyFont: {
    color: "white",
    fontWeight: "900",
    fontSize: "40px",
    fontFamily: "Nunito",
  },
}));


export default function ProfileEdit() {

    const classes = useStyles();
    
    const [addChefName, setAddChefName] = useState("")
    const [addBio, setAddBio] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); 


    const handleProfile = (e) => {
        const chefName = addChefName
        const bio = addBio

        e.preventDefault()
        console.log("handleProfile post called")

        axios.post("/db/updateProfile")
        .then((res) => {
            console.log("response from axios:", res)
            if (res.status == 200) {
                console.log("Chef info saved to db")
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={classes.body}>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 700,
                  height: 700,
                },
              }}
            >
                <h1> Tell us more, Chef </h1>
            <Paper elevation={3} >
                <form onSubmit={handleProfile}>
            <Stack spacing={2}>
            <div>
            <h3> Whats your name? </h3>
            <TextField
            
          required
          id="outlined-required"
          label="Chef Name"
          defaultValue=""
          
        />
        <h3> Tell us more! </h3>
        <TextField
          required
          id="outlined-required"
          label="Bio"
          defaultValue=""
        />
            </div>
            </Stack>
            </form>
            </Paper>
            </Box>      
        </div>
    )
    
}