import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddColumnToEnrollment1609102538124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('enrollments', new TableColumn(
            {
                name: 'status',
                type: 'varchar',
                isNullable: false,
                default: "'P'",
            }
        ))
        await queryRunner.addColumn('enrollments', new TableColumn(
            {
                name: 'approved_by',
                type: 'uuid',
                isNullable: true
            }
        ))
        await queryRunner.createForeignKey(
            'enrollments',
            new TableForeignKey({
                name: 'EnrollmentApprovedBy',
                columnNames: ['approved_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('enrollments', 'EnrollmentApprovedBy')
        await queryRunner.dropColumn('enrollments', 'status')
        await queryRunner.dropColumn('enrollments', 'approved_by')
    }

}
