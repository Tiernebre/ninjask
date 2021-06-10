import { MigrationInterface, QueryRunner } from "typeorm";

export class PositiveConstraintOnPickNumber1623291635165
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE draft_selection ADD CONSTRAINT positive_pick_number_check CHECK (pick_number > 0);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE draft_selection DROP CONSTRAINT positive_pick_number_check;
        `);
  }
}
