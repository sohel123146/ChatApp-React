import { createContext,useCallback,useState,useEffect } from "react";
import { postRequest } from "../Utils/Services";
import { baseUrl } from "../Utils/Services";

export const AuthContext = createContext();

export const AuthContextProvider = (props)=>{
    const [user,setUser] = useState(null)
    const [registerError,setRegisterError] = useState(null)
    const [registerInfo,setRegisterInfo] = useState({
        name:'',
        email:'',
        password:'',
    })
    const [loginError,setLoginError] = useState(null)
    const [loginInfo,setLoginInfo] = useState({
        email:'',
        password:''
    })



    const updateRegisterInfo = useCallback((info)=>{    //updateing the registerinfo this info refers to the data that we entered in the form
        setRegisterInfo(info)
    },[])
    
    useEffect(()=>{
        const user = localStorage.getItem("User")  //setting satate even after we refresh the browser
        setUser(JSON.parse(user))
    },[])
    
    //user Signup
    const registerUser = useCallback(async()=>{   //using callback function to optimize the function
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo))  //fetching url and changing data into json object

        if(response.error){
            return setRegisterError(response)    //setting error if response has error.response is a object
        }

        localStorage.setItem("User",JSON.stringify(response))  //storing user in local storage so that we don't have to register again and agian
        setUser(response)  //setting user if dosent have any error
    },[registerInfo]) //call the registerinfo to get the updated data


    const updateLoginInfo = useCallback((info)=>{    //updateing the logininfo this info refers to the data that we entered in the form
        setLoginInfo(info)
    },[])


    //user Login
    const loginUser = useCallback(async()=>{  //using callback function to optimize the function
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo))   //fetching url and changing data into json object

        if(response.error){
            return setLoginError(response)    //setting error if response has error.response is a object
        }

        localStorage.setItem("User",JSON.stringify(response))  //storing user in local storage so that we don't have to register again and agian
        setUser(response)  //setting user if dosent have any error

    },[loginInfo])



    //user Loggingout
    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User")
        setUser(null)
    },[])


    return (
        <AuthContext.Provider value={{user,registerInfo,updateRegisterInfo,registerUser,registerError,logoutUser,loginInfo,loginUser,updateLoginInfo,loginError}}>
            {props.children}
        </AuthContext.Provider>
    )
}