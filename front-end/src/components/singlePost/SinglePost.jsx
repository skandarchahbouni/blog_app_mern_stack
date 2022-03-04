import { Link } from "react-router-dom";
import "./singlePost.css";

export default function SinglePost({post}) {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post &&  
          <img
            className="singlePostImg"
            src={post.photo}
            alt=""
          />
        }
        <h1 className="singlePostTitle">
           {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
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
          <br />
          {post.desc}
        </p>
      </div>
    </div>
  );
}
