import { MigrationInterface, QueryRunner } from "typeorm";

export class VersionsForeignKey1627852969184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE version_denied_pokemon
            ADD CONSTRAINT version_denied_pokemon_version_id_fkey
                FOREIGN KEY (version_id)
                REFERENCES versions (id)
                ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
