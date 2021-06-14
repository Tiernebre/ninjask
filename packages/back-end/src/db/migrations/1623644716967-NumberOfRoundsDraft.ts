import {MigrationInterface, QueryRunner} from "typeorm";

export class NumberOfRoundsDraft1623644716967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE draft ADD COLUMN number_of_rounds INTEGER NOT NULL DEFAULT 6;
            ALTER TABLE draft ADD CONSTRAINT valid_number_of_rounds CHECK (number_of_rounds BETWEEN 1 and 6);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE draft DROP CONSTRAINT valid_number_of_rounds;
            ALTER TABLE draft DROP COLUMN number_of_rounds;
        `)
    }

}
