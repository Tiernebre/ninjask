import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserChallengeRelationship1620347734374
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
          `
            ALTER TABLE IF EXISTS challenge_users_users RENAME TO user_challenges
          `.trim()
      )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
          `
            ALTER TABLE IF EXISTS user_challenges RENAME TO challenge_users_users
          `.trim()
      )
  }
}
