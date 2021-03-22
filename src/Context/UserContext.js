import React,{createContext,useState} from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const[userDetails,setUserDetails]=useState({})


    const updateUser = (data)=>{
        setUserDetails(data)
    }

    const removeUser = ()=>{
        setUserDetails(null)
    }

    return (


        <UserContext.Provider value={{userDetails,updateUser,removeUser}}>{props.children}</UserContext.Provider>
            
        
    )
}

export default UserContextProvider
