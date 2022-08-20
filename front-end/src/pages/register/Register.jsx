import axios from "axios"
import { useRef } from "react"
import "./register.css"

export default function Register() {
  const username = useRef()
  const password = useRef()
  const email = useRef()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(username.current.value, email.current.value, password.current.value)
    try {
      const res = await axios.post("/api/auth/register", {username: username.current.value, email: email.current.value, password:password.current.value})
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location = "/"
    } catch (error) {
      console.log(error.response.data)
      if(error.response.data.username){
        return alert(error.response.data.username)
      }
      if(error.response.data.email){
        return alert(error.response.data.email) 
      }
      if(error.response.data.password){
        return alert(error.response.data.password)
      }
      
    }
  }
    return (
      <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." ref={username}/>
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." ref={email}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." ref={password}/>
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton" type="submit">Login</button>
    </div>
    )
}
