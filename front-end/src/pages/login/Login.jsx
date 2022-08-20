import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {

  const usernameRef = useRef()
  const passwordRef = useRef()

  const {dispatch, isFetching} = useContext(Context)

  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      
      dispatch({type: "LOGIN_START"})
      const res = await axios.post("/api/auth/login", {username: usernameRef.current.value, password: passwordRef.current.value})
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      window.location ="/"
    } catch (err) {
      dispatch({type: "LOGIN_FAILURE"})
      if(err.response.data.customMessage){
        alert(err.response.data.customMessage)
      }else{
        alert("Something went wrong, please try again later.")
      }
    }
  }


  console.log(isFetching)
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." ref={usernameRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
        <button className="loginButton" type="submit"  disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  );
}
