import React from 'react'
import hom from '../css/home.module.css'
import Nav from './Nav';
import Footer from './footer';
import View from './View';
import { Link,useNavigate,useLocation  } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search
  const Navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/${cat}`); 
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div >
      <Nav/>
      <div className={hom.home}>

            <div className={hom.posts}>
        {posts.map((post) => (
          <div className={hom.post} key={post.id}>
            <div className={hom.img}>
              <img src={`../upload/${post.image}`} alt="" />
            </div>
            <div className={hom.content}>
              <Link className={hom.link} to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.post)}</p>
              <Link className={hom.button} to={`/post/${post.id}`}>
              <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Home
/**
 * 
 * <div className={hom.content}>
        {posts.map((item) => (
          <div key={item.id} className={hom.innerd}>
            <img src={`../upload/${item.image}`} alt="example"  />
            <div className={hom.box}>
            <Link to={`/post/${item.id}`}>
                <h1>{item.title}</h1>
              </Link>
            <p>{getText(item.post)}</p>
            <button className={hom.button} onClick={Navigate}>Read more</button>
            </div>
          </div>
        ))}
      </div>

      .maindiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1287142.jpg&fm=jpg');
  width: 100vw;
  max-width: 100%;
}

.content {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
  margin: 100px;
  width: auto;
}

.innerd {
  display: flex;
  flex-direction: row;
  background-color: #fefff1;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  width: 1000px;
  height: 400px;
}

.innerd img {
  min-width: 500px;
  height: 400px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

}

.innerd .box{
  border: 2px solid black;
  
  padding: 20px;
}

.innerd h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 15px;
  color: #1b1b1b;
  order: 1;
}

.innerd p {
  font-size: 15px;
  margin-top: 20px;
  line-height: 1.5;
  color: #555;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  order: 2;
}

.button {
  background-color: #fe3f00;
  color: #fff;
  margin-top: 100px;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  height: 50px;
  width: 150px;
  transition: all .3s ease-in-out;
  order: 3;
  margin-left: 300px;
}

.button:hover {
  background-color: #fff;
  color: #fe3f00;
  border: 1px solid #fe3f00;
}

 * 
 * 
 */