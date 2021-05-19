import { MigrationInterface, QueryRunner } from "typeorm";

export class ChallengeResultIdFix1621395319610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE challenge_participants ALTER COLUMN id TYPE INTEGER;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE challenge_participants ALTER COLUMN id TYPE BIGINT;`
    );
  }
}
