import { MigrationInterface, QueryRunner } from "typeorm";

export class VersionsSchema1627617488493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS pokemon_versions (
                id SERIAL PRIMARY KEY NOT NULL,
                name TEXT UNIQUE NOT NULL,
                version_group_id INTEGER NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
