import { MigrationInterface, QueryRunner } from "typeorm";

export class LeagueCreatorId1628040851533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE league ADD COLUMN creator_id INTEGER REFERENCES users (id) ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
