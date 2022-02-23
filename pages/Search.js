import React,{useState,useEffect}from 'react'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar'
import baseUrl from '../mongodb/baseUrl';
import styles from "../styles/Home.module.css";

function Search() {
  const [term, setTerm] = useState("");
  const [images, setImages] = useState([])
  const searchUserQuery = async (e) => {
    e.preventDefault();
    const fetchReq = await fetch(`${baseUrl}/api/searchimage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchterm: term.toLowerCase(),
      }),
    });
    const response = await fetchReq.json();
    
    if(response.length===0){
      return "Not Found"
    }
   await setImages([...response])

    console.log(images)
  };

 
  return (
    <>
    
    
   <Navbar/>
   <div className={styles.searchbox}>
        <form
          onSubmit={(e) => {
            searchUserQuery(e);
          }}
        >
          <input
         
            className={styles.input}
            type="text"
            placeholder="Search"
            value={term}
            name="search"
            id="search"
            onChange={(e) => setTerm(e.target.value)}
            onSubmit={searchUserQuery}
          />
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
      {
        images.map(elm=>{
          <img src={elm.imageUrl} alt="elmmm" />
        })
      }
    <Footer/>
    </>
  )
}

export default Search