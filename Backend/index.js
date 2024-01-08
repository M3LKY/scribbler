import express from "express";
import authRoutes from "./routes/auth.js";
//import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cookieParser());

// define cors options
const corsOptions = {
    origin: "http://127.0.0.1:5173", // allow specific origin
    credentials: true // allow cookies
};

// enable cors for all routes
app.use(cors(corsOptions));


// enable pre-flight request for specific route
app.options("/api/upload", cors());

app.listen(3000, () => {
    console.log("Connected!");
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../Client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

// use relative path for route
app.post("/api/upload", upload.single("file"), function (req, res) {
    //try {
        const file = req.file;
        res.status(200).json(file.filename);
    // } catch (error) {
    //     console.log(error)
    // }
});

// use relative path for route
app.use("/api/auth", authRoutes);
//app.use("/api/users", userRoutes);
// use relative path for route
app.use("/api/posts", postRoutes);

