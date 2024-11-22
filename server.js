import express from "express";
import routes from "./src/config/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"))
routes(app)

app.listen(3000,()=>{console.log(`server listening...`)});