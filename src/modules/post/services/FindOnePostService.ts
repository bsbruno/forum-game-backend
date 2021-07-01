import IPostRepository from "../repositories/IPostRepository";
import { inject, injectable } from "tsyringe";

import Posts from "../infra/typeorm/entities/Posts";

interface IRequest {
    id: string;
}

@injectable()
export default class FindOnePostService {
    constructor(
        @inject("PostRepository")
        private postRepo: IPostRepository
    ) {}

    public async execute({ id }: IRequest): Promise<Posts | undefined> {
        const findOnePost = await this.postRepo.findOnePost(id);

        return findOnePost || undefined;
    }
}
