import { MigrationInterface, QueryRunner } from "typeorm";

export class LeagueCreator1628049707531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE IF EXISTS league ADD COLUMN IF NOT EXISTS creator_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
