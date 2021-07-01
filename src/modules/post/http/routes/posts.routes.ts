import ensureAutheticate from "@modules/users/http/middleware/ensureAutheticate";
import { Router } from "express";
import FindOnePostControlle from "../controllers/FindOnePostControlle";
import PostController from "../controllers/PostControllers";

const postRoutes = Router();
const postController = new PostController();
const findOnePostControlle = new FindOnePostControlle();
postRoutes.use(ensureAutheticate);

postRoutes.post("/", postController.create);
postRoutes.get("/", postController.show);
postRoutes.get("/:id_user", postController.index);
postRoutes.get("/v1/:id", ensureAutheticate, findOnePostControlle.index);
postRoutes.delete("/:id_post", postController.delete);

export default postRoutes;
