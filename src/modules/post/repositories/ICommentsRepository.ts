import Comments from "../infra/typeorm/entities/Comments";
import ICreateCommentDTO from "../dtos/ICreateCommentDTO";

export default interface ICommentsRepository {
    create(data: ICreateCommentDTO): Promise<Comments>;
    save(comments: Comments): Promise<Comments>;
    show(id_user: string): Promise<Comments[]>;
    findCommentByPosterId(id_post: string): Promise<Comments[]>;
}
