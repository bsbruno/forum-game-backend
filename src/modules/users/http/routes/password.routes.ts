import { Router } from "express";
import SendForgotPasswordController from "../controllers/SendForgotPasswordController";
import ResetPassordController from "../controllers/ResetPasswordController";
import { celebrate, Joi, Segments } from "celebrate";
import regexPassword from "@config/regexPassword";
const passwordRouter = Router();
const sendForgotPasswordController = new SendForgotPasswordController();
const resetPassordController = new ResetPassordController();

passwordRouter.post("/forgot", sendForgotPasswordController.create);
passwordRouter.post(
    "/reset",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            token: Joi.string().required().uuid(),
            password: Joi.string().required(),
        }),
    }),
    resetPassordController.create
);

export default passwordRouter;
