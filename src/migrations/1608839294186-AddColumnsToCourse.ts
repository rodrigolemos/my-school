import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnsToCourse1608839294186 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses', new TableColumn({
            name: 'positions',
            type: 'integer',
            isNullable: false,
            default: 10
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('courses', 'positions')
    }

}
