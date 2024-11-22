dotenv.config();
import dotenv from "dotenv";
import conectarAoBanco from "../dbconfig.js"
import { ObjectId } from "mongodb";
const conexao = await conectarAoBanco(process.env.CONEXAO)

export async function getTodosPosts(){
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.find().toArray()
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novopost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)},{$set:novopost})
}
