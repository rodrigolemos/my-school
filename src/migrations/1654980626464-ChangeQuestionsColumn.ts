import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangeQuestionsColumn1654980626464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey('questions')
        await queryRunner.createPrimaryKey('questions', ['course_id', 'order'])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
