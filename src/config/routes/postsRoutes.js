import express from "express"
import { listarPosts, postarNovoPost } from "../controllers/postsControllers.js"

const routes = (app) =>{
    app.use(express.json())

    app.get("/",(req,res)=>{res.send("Hello, World")})
    
    app.get("/posts",listarPosts)

    app.post("/post",postarNovoPost)
}


export default routes;