import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Write from './pages/Write';
import View from './pages/View';
import MyPosts from './pages/MyPosts';
import Login from './pages/Login';
import Nav from './pages/Nav';
import Footer from './pages/footer';
import { AuthContexProvider } from "./context/authContext";


const router = createBrowserRouter([
  
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/myposts",
    element: <MyPosts/>,
  },
  {
    path: "/write",
    element: <Write/>,
  },
  {
    path: "/post/:id",
    element: <View/>,
  },
  {
    path: "/",
    element: <Home/>,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContexProvider>
    <RouterProvider router={router} />
      </AuthContexProvider>
     
    <App />
  </React.StrictMode>,
)
