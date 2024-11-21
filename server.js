import express from "express";
import routes from "./src/config/routes/postsRoutes.js";

const app = express();

routes(app)

app.listen(3000,()=>{console.log(`server listening...`)});