import { MigrationInterface, QueryRunner } from "typeorm";

export class ChallengeStatus1623637861410 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE challenge_status AS ENUM ('CREATED', 'POOLED', 'DRAFTED', 'COMPLETED');
            ALTER TABLE IF EXISTS challenge ADD COLUMN IF NOT EXISTS status challenge_status NOT NULL DEFAULT 'CREATED';
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE IF EXISTS challenge DROP COLUMN IF EXISTS status;
            DROP TYPE challenge_status;
        `);
  }
}
