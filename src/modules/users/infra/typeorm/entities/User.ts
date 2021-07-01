import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    OneToOne,
    ManyToOne,
} from "typeorm";

import { Exclude, Expose } from "class-transformer";
import Post from "@modules/post/infra/typeorm/entities/Posts";
import uploadConfig from "@config/upload";

@Entity("users")
export default class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    avatar: string;

    @Column()
    @Exclude()
    post_id: string;

    @Column()
    user_img: string;

    @OneToMany(() => Post, (post) => post.id)
    @JoinColumn()
    post: Post[];

    @ManyToOne(() => Post, (post) => post.img_user)
    @JoinColumn({ name: "user_img" })
    teste: Post;

    @Column()
    nickname: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: "avatar_url" })
    getPhotoUrl(): string | null {
        if (!this.avatar) return null;
        switch (uploadConfig.driver) {
            case "disk":
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case "s3":
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
            default:
                return null;
        }
    }
}
