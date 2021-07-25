import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteCascadeCleanUpForChallenges1627186725557
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE challenge_participants
    DROP CONSTRAINT challenge_users_users_challenge_id_fkey,
    ADD CONSTRAINT challenge_users_users_challenge_id_fkey
      FOREIGN KEY (challenge_id)
      REFERENCES challenge (id)
      ON DELETE CASCADE;


  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
