import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CommentsCreate1624032398419 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "text_comments",
                        type: "char(150)",
                    },
                    {
                        name: "id_post",
                        type: "uuid",
                    },
                    {
                        name: "id_user",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "IdUserComments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_user"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "IdUserPost",
                        referencedTableName: "posts",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_post"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("comments", "IdUserComments");
        await queryRunner.dropForeignKey("comments", "IdUserPost");
        await queryRunner.dropTable("comments");
    }
}
