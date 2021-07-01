import { Request, Response } from "express";
import { container } from "tsyringe";
import FindOnePostService from "@modules/post/services/FindOnePostService";
import { classToClass } from "class-transformer";

export default class FindOnePostControlle {
    public async index(req: Request, res: Response): Promise<Response> {
        const postRepo = container.resolve(FindOnePostService);
        const { id } = req.params;

        const post = await postRepo.execute({ id });
        return res.json(classToClass(post));
    }
}
