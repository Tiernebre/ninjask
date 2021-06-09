import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIndexForPokemonIdOnDraftSelection1623215125411
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE INDEX IF NOT EXISTS draft_selection_pokemon_idx ON draft_selection (pokemon_id);
        CREATE INDEX IF NOT EXISTS draft_selection_draft_idx ON draft_selection (draft_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP INDEX IF EXISTS draft_selection_draft_idx;
        DROP INDEX IF EXISTS draft_selection_pokemon_idx;
    `);
  }
}
