import { Repository, getRepository } from "typeorm";
import Commments from "../entities/Comments";
import ICreateCommentDTO from "@modules/post/dtos/ICreateCommentDTO";
import ICommentsRepository from "@modules/post/repositories/ICommentsRepository";

export default class CommentsRepository implements ICommentsRepository {
    private ormRepo: Repository<Commments>;
    constructor() {
        this.ormRepo = getRepository(Commments);
    }

    public async create({
        id_post,
        id_user,
        text_comments,
    }: ICreateCommentDTO): Promise<Commments> {
        const comments = this.ormRepo.create({
            id_post,
            id_user,
            text_comments,
        });
        await this.ormRepo.save(comments);

        return comments;
    }

    public async save(comments: Commments): Promise<Commments> {
        return this.ormRepo.save(comments);
    }

    public async show(id_user: string): Promise<Commments[]> {
        return this.ormRepo.find({ relations: ["user"] });
    }

    public async findCommentByPosterId(id_post: string): Promise<Commments[]> {
        const findPost = this.ormRepo.find({
            relations: ["user"],
            where: {
                id_post,
            },
        });
        return findPost;
    }
}
