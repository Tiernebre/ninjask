import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSeason1619588596817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS season (
                id BIGSERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                league_id BIGINT references league.id
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS season;");
  }
}
