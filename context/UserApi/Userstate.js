import Context from "./Context";
import { useState } from "react";
const UserState=(props)=>
{
   
    const [userEmail, setUserEmail] = useState("")
    const [profile, setProfile] = useState({
      userimg:"",
    })
  
return (
    <Context.Provider value={{setUserEmail,setProfile,userEmail,profile}}>
        {props.children}
    </Context.Provider>
)

}
export default UserState;