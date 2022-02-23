import React from 'react'
import styles from '../styles/Home.module.css'
import {BsYoutube,BsFacebook,BsInstagram} from 'react-icons/bs'
import {SiWebmoney} from 'react-icons/si'
import Link from 'next/link'
function Footer() {
  return (
    <>
    <div className={styles.footer}>
    <div className={styles.foot}>
   <p>
    © Copyrights:2022 <span className={styles.tag}>ImmiGrow</span> All Rights Reserved

   </p>
    </div>
    <div className={styles.social}>
        <Link  href="https://www.youtube.com/c/GoTechPlus"><a target={"_blank"} >
<BsYoutube size={25} style={{margin:"0 5px"}}/>
            
            </a></Link>
            <Link href="https://www.youtube.com/c/GoTechPlus"><a target={"_blank"} >
            
<BsFacebook size={25} style={{margin:"0 5px"}}/>
            </a></Link>
            <Link href="https://www.youtube.com/c/GoTechPlus"><a target={"_blank"} >
            
<BsInstagram size={25} style={{margin:"0 5px"}}/>
            </a></Link>
            <Link href="https://www.youtube.com/c/GoTechPlus"><a target={"_blank"} >
<SiWebmoney size={25} style={{margin:"0 5px"}}/>
            
            </a></Link>
    </div>

    </div>
   
    
    </>
  )
}

export default Footer