import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";

export default function Single() {

  const {pathname} = useLocation()
  const id = pathname.split("/")[2]

  const [post, setPost] = useState([])

  useEffect(() => {
    const getSinglePost = async ()=>{
      let res;
      try {
        res = await axios.get(`/api/posts/${id}`)
        setPost(res.data)
      } catch (error) {
        console.log(error.toJSON())
      }
    }
    getSinglePost()
  }, [id])
  
  return (
    <div className="single">
      <SinglePost post={post}/>
      <Sidebar />
    </div>
  );
}
