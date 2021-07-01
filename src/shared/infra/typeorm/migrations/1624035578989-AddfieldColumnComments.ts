import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddfieldColumnComments1624035578989 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "posts",
            new TableColumn({
                name: "id_comments",
                type: "uuid",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
