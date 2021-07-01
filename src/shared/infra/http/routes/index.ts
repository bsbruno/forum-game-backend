import passwordRouter from "@modules/users/http/routes/password.routes";
import sessionsRoutes from "@modules/users/http/routes/sessions.routes";
import usersRoutes from "@modules/users/http/routes/user.routes";
import postRoutes from "@modules/post/http/routes/posts.routes";
import { Router } from "express";
import commentsRoutes from "@modules/post/http/routes/comments.routes";
import profileRoutes from "@modules/users/http/routes/profile.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/password", passwordRouter);
routes.use("/post", postRoutes);
routes.use("/comments", commentsRoutes);
routes.use("/profile", profileRoutes);

export default routes;
