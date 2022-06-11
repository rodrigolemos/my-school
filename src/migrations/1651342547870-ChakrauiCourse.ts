import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChakrauiCourse1651342547870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('courses', 'positions')
        await queryRunner.dropColumn('courses', 'period')

        await queryRunner.addColumns('courses', [
            new TableColumn({
                name: 'icon',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'resources',
                type: 'json',
                isNullable: true
            }),
            new TableColumn({
                name: 'audience',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'knowledge',
                type: 'varchar',
                isNullable: true
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses', new TableColumn({
            name: 'positions',
            type: 'integer',
            isNullable: false,
            default: 10
        }))
        await queryRunner.addColumn('courses', new TableColumn({
            name: 'period',
            type: 'varchar',
            isNullable: false
        }))
        await queryRunner.dropColumns('courses', [
            new TableColumn({
                name: 'icon',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'resources',
                type: 'json',
                isNullable: true
            }),
            new TableColumn({
                name: 'audience',
                type: 'varchar',
                isNullable: true
            }),
            new TableColumn({
                name: 'knowledge',
                type: 'varchar',
                isNullable: true
            })
        ]);
    }

}
