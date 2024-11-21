dotenv.config();
import dotenv from "dotenv";
import conectarAoBanco from "../dbconfig.js"
const conexao = await conectarAoBanco(process.env.CONEXAO)

export default async function getTodosPosts(){
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}

    