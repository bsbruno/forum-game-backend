import ensureAutheticate from "@modules/users/http/middleware/ensureAutheticate";
import { Router } from "express";

import CommentsCotroller from "../controllers/CommentsCotroller";

const commentsRoutes = Router();
const commentsCotroller = new CommentsCotroller();

commentsRoutes.post("/", ensureAutheticate, commentsCotroller.create);
commentsRoutes.get("/", ensureAutheticate, commentsCotroller.show);
commentsRoutes.get(
    "/post_comments/:id_post",
    ensureAutheticate,
    commentsCotroller.teste
);

export default commentsRoutes;
