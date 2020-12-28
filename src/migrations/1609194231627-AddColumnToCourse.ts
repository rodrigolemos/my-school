import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnToCourse1609194231627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses', new TableColumn({
            name: 'tags',
            type: 'json',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('courses', 'tags');
    }

}
