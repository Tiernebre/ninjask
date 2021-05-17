import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueChallengeResults1621221959233 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE challenge_results ADD CONSTRAINT unique_user_challenge_results UNIQUE (challenge_id, user_id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE challenge_results DROP CONSTRAINT unique_user_challenge_results;
        `);
  }
}
