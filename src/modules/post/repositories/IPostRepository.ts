import Post from "../infra/typeorm/entities/Posts";
import ICreatePostDTO from "../dtos/ICreatePostDTO";

export default interface IPostRepository {
    create(data: ICreatePostDTO): Promise<Post>;
    save(post: Post): Promise<Post>;
    show(limit?: number): Promise<Post[]>;
    findPostByUserId(id: string): Promise<Post[] | undefined>;
    findOnePost(id_user: string): Promise<Post | undefined>;
    delete(id_post: string): Promise<void>;
}
