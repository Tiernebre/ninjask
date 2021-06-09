import { MigrationInterface, QueryRunner } from "typeorm";

export class DraftSelectionIndexingOnRoundAndPickNumbers1623208726003
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS draft_selection_round_idx ON draft_selection (round_number);
            CREATE INDEX IF NOT EXISTS draft_selection_pick_idx ON draft_selection (pick_number);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX IF EXISTS draft_selection_round_idx;
            DROP INDEX IF EXISTS draft_selection_pick_idx;
        `);
  }
}
