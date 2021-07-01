import IPostRepository from "../repositories/IPostRepository";
import { inject, injectable } from "tsyringe";

import Post from "../infra/typeorm/entities/Posts";

@injectable()
export default class ListShowPostService {
    constructor(
        @inject("PostRepository")
        private postRepo: IPostRepository
    ) {}

    public async execute(limit?: number): Promise<Post[]> {
        const post = await this.postRepo.show(limit);

        return post;
    }
}
