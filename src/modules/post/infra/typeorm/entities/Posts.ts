import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";

@Entity("posts")
export default class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    post_text: string;

    @Column()
    id_user: string;

    @Column()
    id_comments: string;

    @Column()
    img_user: string;

    @ManyToOne(() => User, (user) => user.password)
    @JoinColumn({ name: "id_user" })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
