import CreateUserService from "@modules/users/services/CreateUserService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

export default class CreateUserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password, nickname } = req.body;
        const createUserService = container.resolve(CreateUserService);

        const users = await createUserService.execute({
            name,
            nickname,
            email,
            password,
        });

        return res.json({ users: classToClass(users) });
    }
}
