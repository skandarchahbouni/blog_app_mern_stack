import { Link } from "react-router-dom";
import "./post.css";

const PF = "http://localhost:5000/images/";

export default function Post({post}) {
  return (
    <div className="post">

      {post.photo && 
      <img
        className="postImg"
        src={PF + post.photo}
        alt=""
      />}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map(cat =>          
          <span className="postCat" key={cat}>
            <Link className="link" to={`/posts?cat=${cat}`}>
              {cat}
            </Link>
          </span>
          )}
        </div>

        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.updatedAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
