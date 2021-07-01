import Comments from "../infra/typeorm/entities/Comments";
import ICommentsRepository from "../repositories/ICommentsRepository";
import { inject, injectable } from "tsyringe";
import ICacheProvider from "@shared/container/CacheProvider/models/ICacheProvider";
import { classToClass } from "class-transformer";

interface IRequest {
    id_post: string;
}

@injectable()
export default class FindCommentsByPosterService {
    constructor(
        @inject("CommmetsRepository")
        private commentRepo: ICommentsRepository,

        @inject("RedisCacheProvider")
        private cache: ICacheProvider
    ) {}

    public async execute({ id_post }: IRequest): Promise<Comments[]> {
        const key = `comments-key-by-post:${id_post}`;
        let comments = await this.cache.recover<Comments[]>(key);
        if (!comments) {
            comments = await this.commentRepo.findCommentByPosterId(id_post);
            await this.cache.save(key, classToClass(comments));
        }

        return comments;
    }
}
