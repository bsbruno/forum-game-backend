import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import { celebrate, Joi, Segments } from "celebrate";
import ensureAutheticate from "../middleware/ensureAutheticate";

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(ensureAutheticate);

profileRoutes.post("/", profileController.update);

export default profileRoutes;
