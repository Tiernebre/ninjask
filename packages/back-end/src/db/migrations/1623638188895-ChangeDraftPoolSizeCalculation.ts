import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeDraftPoolSizeCalculation1623638188895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE draft RENAME COLUMN pool_size TO extra_pool_size;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE draft RENAME COLUMN extra_pool_size TO pool_size;
        `)
    }

}
