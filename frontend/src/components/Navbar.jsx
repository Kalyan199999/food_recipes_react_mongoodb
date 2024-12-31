import { useState , useEffect } from "react"
import { Link } from "react-router-dom"

const user = JSON.parse(localStorage.getItem("user"))

console.log(user)

function Navbar() {

  let token = localStorage.getItem("token")
  
  let [isLogin , setLogIn] = useState( token ? true: false)

  useEffect(()=>{
    setLogIn( token ? true : false)
  } , [token ])


  const checkLogIn = ()=>{

    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setLogIn(false)
    }
    else{
      setLogIn(true)
    }
  }


  return (
    <>
       <div className="navbar">

          <h2>Food Blog</h2>
          
          <ul>
          
          <li><Link to="/">Home</Link></li>

          <li ><Link to={isLogin ?"/myrecipe":'/login-register'}>My Recipe</Link></li>

          <li ><Link to={isLogin ?"/favourites":'/login-register'} >Favourites</Link></li>

          {
            isLogin ? <li onClick={()=>{checkLogIn()}}><Link to="/">{ user ? `Welcome ${user.email}` : ""}</Link></li> : 
                      <li><Link to="/login-register">Login</Link></li>
          }
          
          </ul>
          
          </div>

    </>
  )
}

export default Navbar
