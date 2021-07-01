import ICommentsRepository from "../repositories/ICommentsRepository";
import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import Comments from "../infra/typeorm/entities/Comments";
import ICacheProvider from "@shared/container/CacheProvider/models/ICacheProvider";
import { classToClass } from "class-transformer";

interface IRequest {
    id_user: string;
}

@injectable()
export default class ListCommentService {
    constructor(
        @inject("CommmetsRepository")
        private commentRepo: ICommentsRepository,

        @inject("RedisCacheProvider")
        private cache: ICacheProvider
    ) {}

    public async execute({ id_user }: IRequest): Promise<Comments[]> {
        const key = `comments-key`;
        let comments = await this.cache.recover<Comments[]>(key);
        if (!comments) {
            comments = await this.commentRepo.show(id_user);
            await this.cache.save(key, classToClass(comments));
        }
        return comments;
    }
}
