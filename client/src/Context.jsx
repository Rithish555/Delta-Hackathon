import { createContext,useState,useEffect } from "react";
import axi from "./axios.js";

export const Context = createContext();

export const ContextProvider = (({children})=>{

    const [isLoggedIn,setIsLoggedIn] = useState(null);
    const [role,setRole] = useState(null);
    const [mail,setmail] = useState(null);
    const [id,setid] = useState(null);

    return(
        <Context.Provider value={{isLoggedIn,setIsLoggedIn,role,setRole,mail,setmail,id,setid}}>
            {children}
        </Context.Provider>
    );
})