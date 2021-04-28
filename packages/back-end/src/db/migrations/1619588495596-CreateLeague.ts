import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateLeague1619588495596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS league (
            id BIGSERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            updated_at timestamp without time zone DEFAULT now() NOT NULL
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS league;
        `);
  }
}
