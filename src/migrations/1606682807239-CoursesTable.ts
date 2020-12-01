import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CoursesTable1606682807239 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'courses',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'period',
                        type: 'varchar',
                        length: '1',
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
            'courses',
            new TableForeignKey({
                name: 'CourseCreatedBy',
                columnNames: ['created_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('courses', 'CourseCreatedBy')
        await queryRunner.dropTable('courses')
    }

}
