import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class QuestionsTable1653864135104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
        await queryRunner.createTable(
            new Table({
                name: 'questions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'course_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'order',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'question',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'alternatives',
                        type: 'json',
                        isNullable: false
                    },
                    {
                        name: 'answers',
                        type: 'json',
                        isNullable: false
                    },
                    {
                        name: 'created_by',
                        type: 'uuid',
                        isNullable: true
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
            'questions',
            new TableForeignKey({
                name: 'CourseQuestion',
                columnNames: ['course_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'courses',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )

        await queryRunner.createForeignKey(
            'questions',
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
        await queryRunner.dropForeignKey('questions', 'CourseQuestion')
        await queryRunner.dropForeignKey('questions', 'EnrollmentCreatedBy')
        await queryRunner.dropTable('questions')
    }

}
