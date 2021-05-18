import { MigrationInterface, QueryRunner } from "typeorm";

export class ChallengeResultToChallengeParticipant1621304107169
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE challenge_results RENAME TO challenge_participants;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE challenge_participants RENAME TO challenge_results;
        `);
  }
}
