import React, { useState,useEffect,useContext } from "react";
import { useRouter } from "next/router";

import { FaCloudUploadAlt } from "react-icons/fa";
import {CgProfile} from 'react-icons/cg';

import styles from "../styles/Home.module.css";
import baseUrl from "../mongodb/baseUrl";
import Context from "../context/UserApi/Context";
import Link from "next/link";


function Navbar() {
  const holder=useContext(Context)
  const router = useRouter();
  const [naam, setNaam] = useState(false)
  const [menu, setMenu] = useState(false);
const [user, setUser] = useState(false)

const checkUserLoggedIn=async()=>{
const checkmate=await fetch(`${baseUrl}/api/User/tokencheck`)
const whether=await checkmate.json()
console.log(whether)
if(whether.success){
 setUser(!user)
}
else{
  setUser(user)
  alert("First You should Login")
}
}
useEffect(() => {
  checkUserLoggedIn()
}, [])

  const handleHamburgerMenu=async()=>{
    setMenu(!menu)
    
  }
  
  
  const handleLogOut=async()=>{
   
const log=await fetch(`${baseUrl}/api/User/loginuser`,{
  method:"DELETE"
})
 const resp=await log.json()

  if(resp.success){
    holder.setUserEmail("")
    holder.setProfile("")
    await router.push("/Login")
    setUser(!user)

  }

  }
  return (
    <>
     <div className={styles.logo}>  <Link  href=""><a>Immi<span className={styles.tag}>Grow</span> </a></Link></div>
      <nav className={styles.navmenu}>
   
        <div className={styles.upper}>
       
     <div className={styles.proicon}>
     <button
     
     onClick={() => {
       router.push(user?"/UploadImage":"/Login");
     }}
     className={styles.login}
   >
     <FaCloudUploadAlt size={20}/> Upload
   </button>
   <button
      onClick={() => {
       router.push("/about");
     }}
     className={styles.login}
   >
     About
   </button>
     </div>
        
     {!user ? <div className={styles.proicon}>
      
      <button
        onClick={() => {
          router.push("/SignUp");
        }}
        className={styles.login}
      >
        SignUp
      </button>
      <button
        onClick={() => {
          router.push("/Login");
        }}
        className={styles.login}
      >
        Login
      </button>
      
    </div>
    :
    <div className={styles.proicon}>
      <button
      onClick={handleLogOut}
      className={styles.login}
    >
      Logout
    </button>
    <CgProfile onClick={()=>setNaam(!naam)} className={styles.profile} color="white" size={32}/>
    <div className={naam?styles.data:styles.opendata}>
    {holder.userEmail}
    </div>
    </div>
    
    }
        
        </div>
       
      </nav>
    </>
  );
}
export async function getStaticProps() {
  const sendReq = await fetch(`${baseUrl}/api/User/tokencheck`);
  const com = await sendReq.json();
  console.log(com);
  return {
    props: {
      logintoken: com,
    },
  };
}

export default Navbar;
