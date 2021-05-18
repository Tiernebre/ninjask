import { MigrationInterface, QueryRunner } from "typeorm";

export class IndexedChallengeResults1621300868847
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX challenge_result_user_id_idx ON challenge_results(user_id);
            CREATE INDEX challenge_result_hour_idx ON challenge_results(completion_time_hour);
            CREATE INDEX challenge_result_minutes_idx ON challenge_results(completion_time_minutes);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX challenge_result_minutes_idx;
            DROP INDEX challenge_result_hour_idx;
            DROP INDEX challenge_result_user_id_idx;
        `);
  }
}
