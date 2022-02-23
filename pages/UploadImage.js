import Image from "next/image";
import React, { useState } from "react";
import baseUrl from "../mongodb/baseUrl";
import {useRouter} from 'next/router'
import Footer from "../Components/Footer";

const cloudUrl = "https://api.cloudinary.com/v1_1/angusimage/image/upload";

function UploadImage() {
  const router =useRouter()
 
  const [details, setDetails] = useState({
    imagename: "",
    owner: "",
    category: "",
    description: "",
  });
  const [url, setUrl] = useState("");
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(details, url);
    const imageUrl = await imageUrlMaker();
    const response = await fetch(`${baseUrl}/api/uploadphoto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imagename: details.imagename.toLowerCase(),
        owner: details.owner,
        category: details.category,
        description: details.description,
        imageUrl,
      }),
    });
    const {success,message,newAddedImage} = await response.json();
    console.log(success,message,newAddedImage)
   if(success===true){
     router.push("/")
   }
   else{
     alert("Bad details")
   }
  };
  const imageUrlMaker = async () => {
    const appar = new FormData();
    appar.append("file", url);
    appar.append("upload_preset", "angusimage");
    appar.append("cloud_name", "angusimage");
    const sendReq = await fetch(`${cloudUrl}`, {
      method: "POST",
      body: appar,
    });
    const recieve = await sendReq.json();
    console.log(recieve);
    return recieve.url;
    
  };
 
  return (
    <>
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        
        <label htmlFor="name"> Image Name </label>
        <input
          type="text"
          name="imagename"
          value={details.imagename}
          onChange={onChange}
        />
        <label htmlFor="bname"> Photographer Name  </label>
        <input
          type="text"
          name="owner"
          value={details.owner}
          onChange={onChange}
        />
        <label htmlFor="category"> Category  </label>
        <input
          type="text"
          name="category"
          value={details.category}
          onChange={onChange}
        />
        <label htmlFor="desc"> Description </label>
        <input
          type="text"
          name="description"
          value={details.description}
          onChange={onChange}
        />
        <label htmlFor="file"> Image </label>
        <input
          type="file"
          onChange={(e) => setUrl(e.target.files[0])}
          accept="image/*"
        />
        <img src={url ? URL.createObjectURL(url) : ""} alt="" />
        <button type="submit"> Submit </button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default UploadImage;
