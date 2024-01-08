import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.category
    ? "SELECT * FROM blog.posts WHERE category=?"
    : "SELECT * FROM blog.posts";

  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `post`, p.image, u.image AS userImg, `category`,`postdate` FROM blog.users u JOIN blog.posts p ON u.id = p.iduser WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.log(err); // log the error for further troubleshooting
      return res.status(500).json(err);
    } else {
      return res.status(200).json(data[0]);
    }
    
  });
};



export const addPost = (req, res) => {

  const q = "INSERT INTO blog.posts(`title`, `post`, `category`, `image`, `postdate`, `iduser`) VALUES (?)";

  const values = [req.body.title, req.body.post, req.body.category, req.body.image, req.body.postdate, req.body.iduser];

  console.log(values); // log the values variable to see if it is correctly formatted

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err); // log the error for further troubleshooting
      return res.status(500).json(err);
    } else {
      return res.json("Post has been created.");
    }
  });

};




export const deletePost = (req, res) => {

    const postId = req.params.id;
    const q = "DELETE FROM blog.posts WHERE `id` = ?";

    db.query(q, [postId], (err, data) => {
      if (err) {
        console.log(err); // log the error for further troubleshooting
        return res.status(403).json("You can delete only your post!");
      
      }else{
        return res.json("Post has been deleted!");
      }
    });

};

export const updatePost = (req, res) => {

    const postId = req.params.id;
    const q ="UPDATE blog.posts SET `title`=?, `post`=?, `category`=?, `image`=?, `postdate`=?, `iduser`=? WHERE id=?";

    const values = [req.body.title, req.body.post, req.body.category, req.body.image, req.body.postdate, req.body.iduser];

    db.query(q, [...values, postId], (err, data) => {
      
      if (err) {
        console.log(err); // log the error for further troubleshooting
        return res.status(403).json("You can delete only your post!");
      
      }else{
        console.log(data)
        return res.json("Post has been deleted!");
      }
    });

};

export const byCategory = (req, res) => {

}