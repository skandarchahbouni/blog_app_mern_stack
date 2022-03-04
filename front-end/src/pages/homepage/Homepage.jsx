import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";

export default function Homepage() {

  const {search} = useLocation();
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const getPosts = async ()=>{
      const res = await axios.get(`/api/posts${search}`)
      setPosts(res.data)
    }
    getPosts()
  }, [search])
  
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}
