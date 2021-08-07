import { MigrationInterface, QueryRunner } from "typeorm";

export class IndicesForChallengeAndSeasonFetching1628299401422
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX season_league_id_idx ON season (league_id);
            CREATE INDEX challenge_season_id_idx ON challenge (season_id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
