import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";
import Post from "./Posts";

@Entity("comments")
export default class Commments {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    text_comments: string;

    @Column()
    id_post: string;

    @Column()
    id_user: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user" })
    user: User;

    @ManyToOne(() => Post)
    @JoinColumn({ name: "id_post" })
    post: Post;
}
