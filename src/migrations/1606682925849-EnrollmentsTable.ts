import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class EnrollmentsTable1606682925849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'enrollments',
                columns: [
                    {
                        name: 'user_id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'course_id',
                        type: 'integer',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'created_by',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        )

        await queryRunner.createForeignKey(
            'enrollments',
            new TableForeignKey({
                name: 'UserEnrollment',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )

        await queryRunner.createForeignKey(
            'enrollments',
            new TableForeignKey({
                name: 'CourseEnrollment',
                columnNames: ['course_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )

        await queryRunner.createForeignKey(
            'enrollments',
            new TableForeignKey({
                name: 'EnrollmentCreatedBy',
                columnNames: ['created_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('enrollments', 'UserEnrollment')
        await queryRunner.dropForeignKey('enrollments', 'CourseEnrollment')
        await queryRunner.dropForeignKey('enrollments', 'EnrollmentCreatedBy')
        await queryRunner.dropTable('enrollments')
    }

}
