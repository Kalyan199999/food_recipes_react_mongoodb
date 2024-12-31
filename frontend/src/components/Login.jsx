import { useState } from "react"

const obj = {
    email:"",
    password:""
}

function Login({toggleLogin,onSubmit}) {

    const [user,setUser] = useState(obj)

    const handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }

    
  return (
    <>
       <form action="#" >

        <h1>Login</h1>

        <div className="fields">
            <input type="email" name="email" placeholder="Enter your email" value={user.email} onChange={(e)=>handleChange(e)} />
        </div>

        <div className="fields">
            <input type="password" name="password" placeholder="Enter your password" value={user.password} onChange={(e)=>handleChange(e)}  />
        </div>

        <div className="fields">
            <span onClick={(e)=>{toggleLogin(e,false)}}>Not Register? Register </span>
        </div>

        <div className="fields">
            <button className='login' onClick={(e)=>{onSubmit(e , user)}}>login</button>
        </div>

       </form>
    </>
  )
}

export default Login
