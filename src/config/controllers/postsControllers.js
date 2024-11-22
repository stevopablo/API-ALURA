import gerarDescricaoComGemini from "../services/geminiServices.js";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import path from "path";

// Function to list posts
export async function listarPosts(req, res) {
    try {
        const posts = await getTodosPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar posts' });
    }
}

// Function to create a new post
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ error: "Falha na requisição" });
    }
}

// Function to upload an image
export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = path.join("uploads", `${postCriado.insertedId}.png`);

        // Rename and move the uploaded file
        await fs.promises.rename(req.file.path, imagemAtualizada);

        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ error: "Falha na requisição" });
    }
}

// Function to update a post with a new description and image URL
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `${process.env.BASE_URL}/${id}.png`;

    try {
        const imgBuffer = await fs.promises.readFile(path.join("uploads", `${id}.png`));
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ error: "Falha na requisição" });
    }
}
