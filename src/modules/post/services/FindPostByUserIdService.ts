import Posts from "../infra/typeorm/entities/Posts";
import IPostRepository from "../repositories/IPostRepository";
import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id_user: string;
}

@injectable()
export default class FindPostByUserIdService {
    constructor(
        @inject("PostRepository")
        private postRepo: IPostRepository
    ) {}

    public async execute({ id_user }: IRequest): Promise<Posts[]> {
        const post = await this.postRepo.findPostByUserId(id_user);
        if (!post) {
            throw new AppError("Post Dosent Exist");
        }

        return post;
    }
}
