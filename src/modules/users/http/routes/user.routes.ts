import { Router } from "express";
import CreateUserController from "../controllers/CreateUserController";
import { celebrate, Joi, Segments } from "celebrate";
import regexPassword from "@config/regexPassword";
import ProfileShowController from "../controllers/ProfileController";
import ensureAutheticate from "../middleware/ensureAutheticate";
import ProfileAvatarController from "../controllers/ProfileAvatarController";
import multer from "multer";
import uploadConfig from "@config/upload";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const profileShowController = new ProfileShowController();
const profileAvatarController = new ProfileAvatarController();

const upload = multer(uploadConfig.multer);

usersRoutes.post(
    "/",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            nickname: Joi.string().required(),
        }),
    }),
    createUserController.create
);
usersRoutes.get("/", ensureAutheticate, profileShowController.show);

usersRoutes.put(
    "/avatar",
    ensureAutheticate,
    upload.single("avatar"),
    profileAvatarController.update
);

export default usersRoutes;
