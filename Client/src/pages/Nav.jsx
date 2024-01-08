import React, { useState, useEffect } from 'react'
import Navcss from '../css/nav.module.css'
import { Link } from 'react-router-dom'

// Define an array of images to use as the background
const images = [
  // "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://quotefancy.com/media/wallpaper/3840x2160/208554-C-S-Lewis-Quote-You-can-make-anything-by-writing.jpg",
  // "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2NpZW5jZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  // "https://images.unsplash.com/photo-1503431128871-cd250803fa41?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhpbG9zb3BoeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  // "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8b3RoZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
]

const Nav = () => {

  // Define a state variable to keep track of the current image index
  const [currentImage, setCurrentImage] = useState(0)

  // Define a function to update the image index every 5 seconds
  const updateImage = () => {
    setCurrentImage((currentImage + 1) % images.length)
  }

  // Use useEffect to call the updateImage function at regular intervals
  useEffect(() => {
    const interval = setInterval(updateImage, 5000)
    return () => clearInterval(interval)
  }, [currentImage])

  return (
    <div className={Navcss.navbar}>
      {/* Use the current image as the background of the navbar */}
      <div className={Navcss.background} style={{ backgroundImage: `url(${images[currentImage]})` }} />
      <Link to="/">

        <a href="#" className={Navcss.logo}>Scribbler</a>

      </Link>
      <div className={Navcss.options}>
        <Link to="/?category=art">Art</Link>
        <Link to="/?category=technology">Technology</Link>
        <Link to="/?category=science">Science</Link>
        <Link to="/?category=cinema">Cinema</Link>
        <Link to="/?category=design">Design</Link>
      </div>
      <div className={Navcss.userOptions}>
        <Link to="/login">Login</Link>
        <Link to="/write">Write</Link>
      </div>
    </div>
  );
}

export default Nav