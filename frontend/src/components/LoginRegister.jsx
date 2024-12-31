import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

import { useNavigate } from "react-router-dom"

import axios from "axios"

const API = "http://localhost:5050/user"

function LoginRegister() {

  const [isLogin, setLogin] = useState(true)

  const navigate = useNavigate();

  const toggleLogin =  (event,value) => {
    event.preventDefault()
    setLogin(value)
  }

  const onSubmit = async (event , data)=>{
    
    event.preventDefault()

    console.log(data);
    
    const endPoint = isLogin ? `/login` : `/register`
    
   try 
   {
      const d = await axios.post(`${API}${endPoint}`, data)
      console.log(d);
      localStorage.setItem("token", d.data.token)
      localStorage.setItem("user", JSON.stringify(d.data.data))
      
      navigate("/")
      
   } 
   catch (error) 
   {
    console.log(error);
    
   }

    
  }
  
  return (
   <>
     { 
         isLogin ? <Login toggleLogin = {toggleLogin} onSubmit= {onSubmit} /> : 
                  <Register toggleLogin = {toggleLogin} onSubmit={onSubmit} />
    }
   </>
  )
}

export default LoginRegister
