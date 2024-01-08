import axios from "axios";
import React, { useEffect, useState } from "react";
import Cat from '../css/cate.module.css'
import { Link } from "react-router-dom";

const Cate = ({category}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/?category=${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className={Cat.menu}>
      <h1>Recommended</h1>
      {posts.map((post) => (
        <div
          className={Cat.post}
          key={post.id}
          style={{ backgroundImage: `url(../upload/${post?.image})` }}
        >
          <Link to={`/post/${post.id}`}>
          <h2>{post.title}</h2>
          </Link>
          
        </div>
      ))}
    </div>
  );
  
};

export default Cate