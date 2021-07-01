import { Request, Response } from "express";
import { container } from "tsyringe";
import FindPostByUserIdService from "@modules/post/services/FindPostByUserIdService";
import ListShowPostService from "@modules/post/services/ListShowPostService";
import CreatePostService from "@modules/post/services/CreatePostService";
import DeletePostService from "@modules/post/services/DeletePostService";

export default class PostController {
    public async create(req: Request, res: Response): Promise<Response> {
        const postRepo = container.resolve(CreatePostService);

        const { post_text } = req.body;
        const { id_user } = req.user;

        const post = await postRepo.execute({
            id_user,
            post_text,
        });
        return res.json(post);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const postRepo = container.resolve(ListShowPostService);
        const { limit } = req.query;
        const post = await postRepo.execute(Number(limit));

        return res.json(post);
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const postRepo = container.resolve(FindPostByUserIdService);
        const { id_user } = req.params;
        const post = await postRepo.execute({ id_user });

        return res.json(post);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const postRepo = container.resolve(DeletePostService);
        const { id_post } = req.params;
        const post = await postRepo.execute({ id_post });

        return res.json(post);
    }
}
