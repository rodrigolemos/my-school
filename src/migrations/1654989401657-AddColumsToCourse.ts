import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumsToCourse1654989401657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses', new TableColumn({
            name: 'visibility',
            type: 'varchar',
            isNullable: false,
            default: "'public'"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('courses', 'visibility')
    }

}
