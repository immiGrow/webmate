import Router, { useRouter } from 'next/router'
import React,{useState} from 'react'
import baseUrl from '../mongodb/baseUrl'
import styles from '../styles/Home.module.css'
function SignUp() {
  const router=useRouter()
    const [cred, setCred] = useState({
        username:"",
        email:"",
        password:""
    })
    const onChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
        
      }
      const handleSubmitAllCredentials=async(e)=>{
          e.preventDefault()
          
        const userReq=await fetch(`${baseUrl}/api/User/createuser`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:cred.username,
                email:cred.email,
                password:cred.password
            })
            
        })
        const response=await userReq.json()
        console.log(response)
        if(!response.error){
          router.push("/Login")
        }
        else if(response.error){
          alert(response.error)
        }
        
      }
  return (
    <>
     <div className={styles.userlog}>
     <h1>Create account On Immi<span className={styles.tag}>Grow</span></h1>
     <form onSubmit={(e)=>{
          handleSubmitAllCredentials(e)
        }}>
           <div className={styles.password}>
           <label htmlFor="name">Username</label>
           <input type="text" name='username' value={cred.username} required  onChange={onChange}/>
           </div>
           <div className={styles.password}>
           <label htmlFor="email">Email</label>
           <input type="email" name='email' value={cred.email} required  onChange={onChange}/>
           </div>
           <div className={styles.email}>
           <label htmlFor="password">Password</label>
           <input type="password" name='password' value={cred.password} required onChange={onChange} />
           </div>
       
          
           <button className={styles.button} type='submit'>Submit</button>
        </form>
        </div>
    </>
  )
}

export default SignUp