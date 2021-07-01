import Post from "../infra/typeorm/entities/Posts";
import IPostRepository from "../repositories/IPostRepository";
import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ICacheProvider from "@shared/container/CacheProvider/models/ICacheProvider";

interface IRequest {
    id_user: string;
    post_text: string;
}

@injectable()
export default class CreatePostService {
    constructor(
        @inject("PostRepository")
        private postRepo: IPostRepository,

        @inject("RedisCacheProvider")
        private cache: ICacheProvider
    ) {}

    public async execute({ id_user, post_text }: IRequest): Promise<Post> {
        if (!id_user) {
            throw new AppError("User dont exist ");
        }
        if (!post_text) {
            throw new AppError("Post is not null ");
        }
        const post = await this.postRepo.create({
            id_user,
            post_text,
        });

        await this.cache.invalidate(`post-list:`);

        return post;
    }
}
