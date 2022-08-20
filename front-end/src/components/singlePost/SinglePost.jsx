import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

const PF = "http://localhost:5000/images/";

export default function SinglePost({post}) {
  const {user} = useContext(Context)
  // const titleRef = useRef()
  // const descRef = useRef()
  // const photoRef = useRef()

  const editPost = async()=>{
    try {
      await axios.put(`/api/posts/${post._id}`, {})
      window.location = "/"
    } catch (error) {
      alert("Something went wrong, please try again later")
    }
  }

  const deletePost = async()=>{
    try {
      await axios.delete(`/api/posts/${post._id}`, {data: {username: user.username}})
      window.location ="/"
    } catch (error) {
      alert("Something went wrong, please try again later")
    }
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post &&  
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt=""
          />
        }
        <h1 className="singlePostTitle">
           {post.title}
           {user.username === post.username && 
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit" onClick={editPost}></i>
              <i className="singlePostIcon far fa-trash-alt" onClick={deletePost}></i>
            </div>
           }
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.updatedAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.desc}
          <br />
        </p>
      </div>
    </div>
  );
}
