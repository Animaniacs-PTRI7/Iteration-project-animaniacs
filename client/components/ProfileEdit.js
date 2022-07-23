import React, { useEffect, useState } from 'react'
import { Redirect, useNavigate } from "react-router-dom";
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

  textBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonBody: {
    display: "grid",
    gridTemplateRows: "50% 50%"
  },

  profileInput: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  ProfileSubmitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'Transparent'
  }


}));



export default function ProfileEdit() {
  const history = useNavigate();
  const classes = useStyles();

  const [addChefName, setAddChefName] = useState("")
  const [addBio, setAddBio] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  let image = document.getElementById('profileInput')
  console.log(image, 'This is image')

  // const imageUploader = (selectedImage) => {
  //   let formData = new FormData();

  //   fetch({
  //     url: "https://api.imgur.com/3/image",
  //     type: "POST",
  //     datatype: "json",
  //     headers: {
  //       "Authorization": "Client-ID ee0b33bad4fa42e"
  //     },
  //     data: formData,
  //     success: function(response) {
  //       console.log(response);
  //       var photo = response.data.link;
  //       var photo_hash = response.data.deletehash;
  //     },
  //     cache: false,
  //     contentType: false,
  //     processData: false
  // })
  // }

  // console.log(imageUploader(selectedImage))



  const handleProfile = (e) => {
    const chefName = addChefName
    const bio = addBio

    e.preventDefault()
    console.log("handleProfile post called")

    axios.post("/db/updateProfile",
      {
        profileName: chefName,
        profileBio: bio,
        profilePicture: 'imgurl',
      })
      .then((res) => {
        console.log("response from axios:", res)
        if (res.status == 200) {
          console.log("Chef info saved to db")
          history.push({
            pathname: "/feed"
          })
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      console.log(URL.createObjectURL(selectedImage), "PICTURE URL");
    }
  }, [selectedImage]);

  console.log(selectedImage)

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


              <div className={classes.textBody}>
                <div>
                  <h3> Whats your name? </h3>
                  <TextField
                    onChange={(e) => setAddChefName(e.target.value)}
                    required
                    id="outlined-required"
                    label="Chef Name"
                    defaultValue=""

                  />
                </div>





                <div>
                  <h3> Tell us more! </h3>
                  <TextField
                    onChange={(e) => setAddBio(e.target.value)}
                    required
                    id="outlined-required"
                    label="Bio"
                    defaultValue=""
                  />
                </div>
              </div>





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
                <Button variant="raised" component="span" className={classes.ImageUploadButton}>
                  Upload a Profile Picture
                </Button>
</label>

<label htmlFor="raised-button-file">
                <Button
                className={classes.ProfileSubmitButton}
                  onClick={handleProfile}
                  type="submit"
                  variant="contained"
          
                  >
                  Submit
                </Button>
              
</label>




              <div className={classes.ImagePreview}>
                {imageUrl && selectedImage && (
                  <Box mt={2} textAlign="center">
                    <div>Image Preview:</div>
                    <img src={imageUrl} alt={selectedImage.name} height="100px" />
                  </Box>
                )}</div>




            </Stack>
          </form>
        </Paper>
      </Box>
    </div>
  )

}