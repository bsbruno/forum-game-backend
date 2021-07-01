import Post from "../infra/typeorm/entities/Posts";
import IPostRepository from "../repositories/IPostRepository";
import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id_post: string;
}

@injectable()
export default class DeletePostService {
    constructor(
        @inject("PostRepository")
        private postRepo: IPostRepository
    ) {}

    public async execute({ id_post }: IRequest): Promise<void> {
        const post = await this.postRepo.findOnePost(id_post);
        if (!post) {
            throw new AppError("Post Dosent Exist");
        }

        await this.postRepo.delete(id_post);
    }
}
