import { MigrationInterface, QueryRunner } from "typeorm";

export class Challenge1619588654587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS challenge (
                id BIGSERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                version_id BIGINT NOT NULL,
                season_id BIGINT REFERENCES season.id
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXITS challenge;");
  }
}
