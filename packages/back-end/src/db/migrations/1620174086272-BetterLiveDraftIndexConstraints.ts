import { MigrationInterface, QueryRunner } from "typeorm";

export class BetterLiveDraftIndexConstraints1620174086272
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE IF EXISTS draft ADD CONSTRAINT live_pool_pokemon_index_greater_than_constraint CHECK (live_pool_pokemon_index >= -1);
        ALTER TABLE IF EXISTS draft ADD CONSTRAINT live_pool_pokemon_index_lesser_than_constraint CHECK (live_pool_pokemon_index < pool_size);
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE IF EXISTS draft DROP CONSTRAINT live_pool_pokemon_index_greater_than_constraint;
        ALTER TABLE IF EXISTS draft DROP CONSTRAINT live_pool_pokemon_index_lesser_than_constraint;
      `
    );
  }
}
