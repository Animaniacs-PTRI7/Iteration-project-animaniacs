import React, {useState} from 'react'
import axios from "axios";
import { ConstructionOutlined } from '@mui/icons-material';


export default function ProfileEdit() {
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

    // return (

    // )
    
}