import { MigrationInterface, QueryRunner } from "typeorm";

export class VersionsSchemaRename1627852720901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE IF EXISTS pokemon_versions RENAME TO versions;"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
