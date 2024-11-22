import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsControllers.js";
import cors from "cors";

const corsOption = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory to store uploaded images
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Keeps the original file name
      cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOption));

    app.get("/", (req, res) => { res.send("Hello, World"); });
    
    app.get("/posts", listarPosts);

    app.post("/post", postarNovoPost);

    // Fix route by adding missing forward slash
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
