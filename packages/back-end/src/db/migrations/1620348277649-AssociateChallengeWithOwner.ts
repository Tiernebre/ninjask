import { MigrationInterface, QueryRunner } from "typeorm";

export class AssociateChallengeWithOwner1620348277649
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS challenge ADD COLUMN IF NOT EXISTS creator_id INTEGER NOT NULL REFERENCES users (id);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE IF EXISTS challenge DROP COLUMN IF EXISTS creator_id;`
    );
  }
}
