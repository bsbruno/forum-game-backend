import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from "typeorm";

export class AddToColumnProfileUserImg1624285214040
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "posts",
            new TableColumn({
                name: "img_user",
                type: "varchar",
                isNullable: true,
            })
        ),
            await queryRunner.addColumn(
                "users",
                new TableColumn({
                    name: "user_img",
                    type: "varchar",
                    isNullable: true,
                })
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("posts", "img_user");
        await queryRunner.dropColumn("users", "apagar_teste");
    }
}
