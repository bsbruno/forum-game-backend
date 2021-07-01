import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";
import FindCommentsByPosterService from "@modules/post/services/FindCommentsByPosterService";
import CreateCommentService from "@modules/post/services/CreateCommentService";
import ListCommentService from "@modules/post/services/ListCommentService";

export default class PostController {
    public async create(req: Request, res: Response): Promise<Response> {
        const commentRepo = container.resolve(CreateCommentService);
        const { id_post, text_comments } = req.body;
        const { id_user } = req.user;

        const comments = await commentRepo.execute({
            id_user,
            id_post,
            text_comments,
        });
        return res.json(comments);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const commentRepo = container.resolve(ListCommentService);
        const { id_user } = req.params;
        const comments = await commentRepo.execute({ id_user });

        return res.json(comments);
    }

    public async teste(req: Request, res: Response): Promise<Response> {
        const commentRepo = container.resolve(FindCommentsByPosterService);
        const { id_post } = req.params;
        const comments = await commentRepo.execute({ id_post });

        return res.json(classToClass(comments));
    }
}
