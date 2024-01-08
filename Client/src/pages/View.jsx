import React from 'react'
import Viewcss from '../css/view.module.css'
import Nav from './Nav';
import Footer from './footer';
import Edit from "../assets/edit.png";
import Delete from "../assets/trash.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "./Home";
import axios from "axios";
import moment from "moment";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import Cate from './Cate';
const View = () => {

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/${postId}`);
        setPost(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // <Menu cat={post.category} />


  return (
    <div>
      <div className={Viewcss.navbar}> {/* changed this line */}
      <Link to={"/"}>
      <a>Scribbler</a>
      </Link>
  
</div>
    <div className={Viewcss.single}>
      <div className={Viewcss.content}>
        <img src={`../upload/${post?.image}`} alt="" />
        <div className={Viewcss.user}>
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className={Viewcss.info}>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className={Viewcss.edit}>
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.post),
          }}
        ></p>
      </div>
      <Cate category={post.category} />
      
    </div>
    <Footer/>
    </div>
  )
}

export default View
