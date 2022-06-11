import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangeIconType1651434687906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('courses', 'icon', new TableColumn({
            name: 'icon',
            type: 'json',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('courses', 'icon', new TableColumn({
            name: 'icon',
            type: 'varchar',
            isNullable: true,
        }))
    }

}
