import { MigrationInterface, QueryRunner } from "typeorm";

export class LeagueCreator1628049707531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            -- 1 is the creator ID for Brendan (creator of the web-application). Only 1 league at the time of this migration so this is a safe operation.
            ALTER TABLE IF EXISTS league ADD COLUMN IF NOT EXISTS creator_id INTEGER NOT NULL DEFAULT 1 REFERENCES users (id) ON DELETE CASCADE;
            -- Now that the defaults have been applied, we're going to remove it since this shouldn't be a default supported column. It only is for migration.
            ALTER TABLE IF EXISTS league ALTER COLUMN creator_id DROP DEFAULT;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
