import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navbar from '../Components/Navbar'
import widely from '../images/widely.jpg'
import styles from '../styles/Home.module.css'
import easy from '../images/easy.jpg'
import enhance from '../images/enhance.jpg'
import Footer from '../Components/Footer'
function about() {
  return (
    <>
    <Navbar/>
    <div className={styles.cards}>
      <div className={styles.card}>
        <Image src={easy}  className={styles.cardimg} height={400} width={400} alt='Easy and Widely used'/>
        <div className={styles.text}>
        <h3>Easy and Widely used</h3>
        <p style={{color:"white"}}><Link href="/"><a style={{color:"rgb(18, 216, 18)",fontWeight:"bold"}} >ImmiGrow</a></Link> is a easy and widely used platform in concern of images and it provides a best experience to your website.</p>
        </div>
      </div>
      <div className={styles.card}>
        <Image src={widely}  className={styles.cardimg} height={600} width={500} alt='Easy and Widely used'/>
        <div className={styles.text}>
        <h3>Publish Your Passion</h3>
        <p style={{color:"white"}}><Link href="/"><a style={{color:"rgb(18, 216, 18)",fontWeight:"bold"}} >ImmiGrow</a></Link>- provides you to show world your Photography.</p>
        </div>
      </div>
      <div className={styles.card}>
        <Image src={enhance}  className={styles.cardimg}  height={500} width={480} alt='Easy and Widely used'/>
        <div className={styles.text}>
        <h3>Enhance Your Locality</h3>
        <p style={{color:"white"}}><Link href="/"><a style={{color:"rgb(18, 216, 18)",fontWeight:"bold"}} >ImmiGrow</a></Link>-Let the world sleep and you awake.</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default about