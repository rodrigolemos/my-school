import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumnsToUser1608057808838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'contact',
            type: 'varchar',
            isNullable: true,
        }))
        await queryRunner.addColumn('users', new TableColumn({
            name: 'bio',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'contact')
        await queryRunner.dropColumn('users', 'bio')
    }

}
