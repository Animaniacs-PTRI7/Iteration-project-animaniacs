import React, {useState} from 'react'
import axios from "axios";
import { ConstructionOutlined } from '@mui/icons-material';
import { makeStyles } from "@mui/styles";
import Cooking from "../assets/kitchen1.jpg";
import { Stack, Button, Link, Box, CardContent, Paper, TextField, Typography } from "@mui/material";

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
    fontSize: "100px",
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

        axios.post("/db/updateProfile",
        {
        chefName: chefName,
        bio: bio,
        })
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
                  width: 500,
                  height: 350,
                },
              }}
            >
                <h1 className={classes.heavyFont}> Tell us more, Chef </h1>
            <Paper elevation={3} >
                <form onSubmit={handleProfile}>
            <Stack spacing={2}>
            <div>
            <h3> Whats your name? </h3>
            <TextField
          onChange={(e) => setAddChefName(e.target.value)}
          required
          id="outlined-required"
          label="Chef Name"
          defaultValue=""
          
        />
        <h3> Tell us more! </h3>
        <TextField
        onChange={(e) => setAddBio(e.target.value)}
          required
          id="outlined-required"
          label="Bio"
          defaultValue=""
        />
        <input
                    accept="image/*"
                    className={classes.profileInput}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={e => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span" className={classes.profileButton}>
            Upload a Profile Picture
                    </Button>
                </label>
                {imageUrl && selectedImage && (
                    <Box mt={2} textAlign="center">
                        <div>Image Preview:</div>
                        <img src={imageUrl} alt={selectedImage.name} height="100px" />
                    </Box>
                )}
            </div>
            </Stack>
            </form>
            </Paper>
            </Box>      
        </div>
    )
    
}