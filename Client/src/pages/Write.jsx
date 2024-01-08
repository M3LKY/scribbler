import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import WriteM from '../css/write.module.css'
import Footer from './footer';
import { Link } from "react-router-dom";


const Write = () => {
  const state = useLocation().state;
const [value, setValue] = useState(state?.post || "");
const [title, setTitle] = useState(state?.title || "");
const [file, setFile] = useState(state?.image ? "" : state?.image); // modify here
const [cat, setCat] = useState(state?.category || "");
const [imageSrc, setImageSrc] = useState(`../../public/upload/${state?.image}`);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageSrc(objectUrl);
    } else {
      setImageSrc(`../../public/upload/${state.image}`);
    }
  };
const navigate = useNavigate();

const upload = async () => {
  try {
    if (!file) { // add this condition to check if file is already present
      return state.image;
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://localhost:3000/api/upload", formData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const handleClick = async (e) => {
  e.preventDefault();
  const imgUrl = await upload();

  const user = JSON.parse(localStorage.getItem("user"));
  const iduser = user.id;

  try {
    const body = {
      title,
      post: value,
      category: cat,
      image: file ? imgUrl : imgUrl ? state.image : "", // modify here
      postdate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      iduser
    };

    if (state) {
      await axios.put(`http://localhost:3000/api/posts/${state.id}`, body, { withCredentials: true });
    } else {
      await axios.post(`http://localhost:3000/api/posts/`, body, { withCredentials: true });
    }
    navigate("/")
  } catch (err) {
    console.log(err);
  }
};




  return (
    <div className={WriteM.maind}>
      <div className={WriteM.navbar}> {/* changed this line */}
        <Link to={"/"}>
          <a>Scribbler</a>
        </Link>
      </div>
      <div className={WriteM.add}>
        <div className={WriteM.content}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={WriteM.editorContainer}>
            <ReactQuill
              className={WriteM.editor}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className={WriteM.menu}>
          <div className={WriteM.item}>
          <div className={WriteM.hoh}>
        {imageSrc && <img src={imageSrc} alt="Preview" />}
      </div>

      <input
        style={{ display: "none" }}
        type="file"
        id="file"
        name=""
        onChange={handleFileChange}
      />
      <label className={WriteM.file} htmlFor="file">
        Upload Image
      </label>
            <div className={WriteM.buttons}>
              <button onClick={handleClick}>Publish</button>
            </div>
          </div>
          <div className={WriteM.item}>
            <h1>Category</h1>
            <div className={WriteM.cat}>
              <input
                type="radio"
                checked={cat === "art"}
                name="cat"
                value="art"
                id="art"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className={WriteM.cat}>
              <input
                type="radio"
                checked={cat === "science"}
                name="cat"
                value="science"
                id="science"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className={WriteM.cat}>
              <input
                type="radio"
                checked={cat === "technology"}
                name="cat"
                value="technology"
                id="technology"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className={WriteM.cat}>
              <input
                type="radio"
                checked={cat === "cinema"}
                name="cat"
                value="cinema"
                id="cinema"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className={WriteM.cat}>
              <input
                type="radio"
                checked={cat === "design"}
                name="cat"
                value="design"
                id="design"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="design">Design</label>
            </div>
            <div className={WriteM.cat}>
              <input
                type="radio"
                checked={cat === "food"}
                name="cat"
                value="food"
                id="food"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
};

export default Write;
