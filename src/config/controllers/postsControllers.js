import {getTodosPosts, criarPost} from "../models/postsModel.js";

export  async function listarPosts(req, res) {
    try {
      const posts = await getTodosPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar posts' });
    }
}

export async function postarNovoPost(req,res) {
    const novoPost = req.body
    try{
        const postCriado = await criarPost(novoPost)
        res.status(200).json(postCriado)    
    }catch (error){
        console.error(error)
        res.status(500).json({ error: 'Erro ao adicionar posts' });
    }
}
