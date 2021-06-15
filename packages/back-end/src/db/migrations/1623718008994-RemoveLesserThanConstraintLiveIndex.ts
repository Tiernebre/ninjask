import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveLesserThanConstraintLiveIndex1623718008994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE IF EXISTS draft DROP CONSTRAINT live_pool_pokemon_index_lesser_than_constraint;`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``)
    }

}
