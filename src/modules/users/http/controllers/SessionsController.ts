import AutheticanteService from "@modules/users/services/AutheticanteService";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { classToClass } from "class-transformer";
export default class CreateUserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const autheticanteService = container.resolve(AutheticanteService);

        const { user, token } = await autheticanteService.execute({
            email,
            password,
        });

        return res.json({ user: classToClass(user), token });
    }
}
