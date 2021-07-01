import Comments from "../infra/typeorm/entities/Comments";
import ICommentsRepository from "../repositories/ICommentsRepository";
import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ICacheProvider from "@shared/container/CacheProvider/models/ICacheProvider";

interface IRequest {
    id_user: string;
    text_comments: string;
    id_post: string;
}

@injectable()
export default class CreateCommentService {
    constructor(
        @inject("CommmetsRepository")
        private commentRepo: ICommentsRepository,

        @inject("RedisCacheProvider")
        private cache: ICacheProvider
    ) {}

    public async execute({
        id_user,
        id_post,
        text_comments,
    }: IRequest): Promise<Comments> {
        if (!id_user) {
            throw new AppError("User dont exist ");
        }
        if (!id_post) {
            throw new AppError("Post Dosent Exits");
        }
        const comments = await this.commentRepo.create({
            id_post,
            id_user,
            text_comments,
        });
        await this.cache.invalidate(`comments-key-by-post:${id_post}`);
        await this.cache.invalidate(`comments-key`);

        return comments;
    }
}
