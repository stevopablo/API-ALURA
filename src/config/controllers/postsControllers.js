import getTodosPosts from "../models/postsModel.js";

export  async function listarPosts(req, res) {
    try {
      const posts = await getTodosPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar posts' });
    }
}
