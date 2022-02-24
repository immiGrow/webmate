import React, { useState,useContext } from "react";
import baseUrl from "../mongodb/baseUrl";
import {useRouter} from 'next/router'
import Context from "../context/UserApi/Context";
import styles from '../styles/Home.module.css'

function Login() {
  const hold=useContext(Context)
  const router=useRouter()
  const [imguri, setImguri] = useState("")


  

  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const handleSubmitAllCredentials = async (e) => {
   e.preventDefault();
  

    if(!cred.email || !cred.password ){
      alert("Please fill all credentials")
    }
   
    const userReq = await fetch(`${baseUrl}/api/User/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password
        
      }),
    });
    const response = await userReq.json();
    

    if(response.success){

      await router.push("/")
    const userAdd=  await hold.setUserEmail(response.email)
     
     


    }
    else{
      alert("Login with correct credentials")
    }
  
  };
  return (
    <>
    <div className={styles.userlog}>
      <h1>Login To Immi<span className={styles.tag}>Grow</span></h1>
      <form
        onSubmit={(e) => {
          handleSubmitAllCredentials(e);
        }}
      >
      <div className={styles.email}>
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          name="email"
          value={cred.email}
          onChange={onChange}
        />
        </div>
        <div className={styles.password}>
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          name="password"
          value={cred.password}
          onChange={onChange}
        />
      </div>
       <div className={styles.btn}></div>
        <button className={styles.button} type="submit"> Submit to <span>ImmiGrow</span> </button>
      </form>
      </div>
    </>
  );
}

export default Login;
