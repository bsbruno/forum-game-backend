import { getRepository, Repository } from "typeorm";
import Post from "../entities/Posts";
import ICreatePostDTO from "@modules/post/dtos/ICreatePostDTO";
import IPostRepository from "@modules/post/repositories/IPostRepository";

export default class PostRepository implements IPostRepository {
    private ormRepo: Repository<Post>;

    constructor() {
        this.ormRepo = getRepository(Post);
    }

    public async create({ id_user, post_text }: ICreatePostDTO): Promise<Post> {
        const post = this.ormRepo.create({
            id_user,
            post_text,
        });
        await this.ormRepo.save(post);
        return post;
    }

    public async save(post: Post): Promise<Post> {
        return this.ormRepo.save(post);
    }

    public async show(limit?: number): Promise<Post[]> {
        const post = await this.ormRepo.find({
            take: limit,
            order: {
                created_at: "DESC",
            },
            relations: ["user"],
        });

        return post;
    }

    public async findPostByUserId(
        id_user: string
    ): Promise<Post[] | undefined> {
        return await this.ormRepo.find({
            where: {
                id_user,
            },
        });
    }
    public async findOnePost(id: string): Promise<Post | undefined> {
        return await this.ormRepo.findOne({
            relations: ["user"],
            where: {
                id,
            },
        });
    }
    public async delete(id_post: string): Promise<void> {
        await this.ormRepo.delete(id_post);
    }
}
