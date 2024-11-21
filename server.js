import express from "express";
import dotenv from "dotenv";
import conectarAoBanco from "./src/config/dbconfig.js";
dotenv.config();
const app = express();
const posts = [
    { id: 1, descricao: "Millie's christmas", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Gato tomando sol", imagem: "https://placecats.com/sunning/300/200" },
    { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.com/sunning/300/200" },
]

function findPostById(id){
    return posts.findIndex((post)=>{
        return post.id === Number(id)
    })
}
const conexao = await conectarAoBanco(process.env.CONEXAO)
async function getTodosPosts(){
    const db = conexao.db("imersao_instabytes")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}
app.get("/posts", async (req,res)=>{
    const posts = await getTodosPosts()
    res.status(200).json(posts)
})
app.use(express.json()) 
app.get("/",(req,res)=>{res.send("Hello, World")})
app.get("/post",(req,res)=>{res.status(200).json(posts)})

app.get("/post/:id",(req,res)=>{
    const index = findPostById(req.params.id)
    res.status(200).json(posts[index])})

app.listen(3000,()=>{console.log(`server listening...`)});