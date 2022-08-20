import { useContext, useRef, useState } from "react";
import {Context} from '../../context/Context'
import axios from 'axios'
import "./write.css";

export default function Write() {
  
  const titleRef = useRef()
  const descRef = useRef()
  const [file, setFile] = useState(null)
  
  const {user} = useContext(Context)
  
  const handleSubmit = async(e)=>{
    e.preventDefault()

    const newPost = {
      "username": user.username,
      "title": titleRef.current.value,
      "desc": descRef.current.value
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/api/posts/", newPost)
      window.location = "/"
    } catch (error) {
      alert("Something went wrong, please try again later.")
    }
  }

  const test = (e)=>{
    setFile(e.target.files[0])
    console.log(file)
  }
  return (
    <div className="write">
      {file ? 
      
      <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      /> :
        <img
          className="writeImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> 
    }
        
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={test}/>
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            ref={titleRef}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            ref={descRef}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
