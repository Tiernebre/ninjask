import { MigrationInterface, QueryRunner } from "typeorm";

export class UserChallengeResults1621220394634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE user_challenges DROP CONSTRAINT challenge_users_users_pkey,
ADD COLUMN IF NOT EXISTS id BIGSERIAL PRIMARY KEY NOT NULL,
ADD COLUMN IF NOT EXISTS completion_time_hour INTEGER,
ADD COLUMN IF NOT EXISTS completion_time_minutes INTEGER,
ADD COLUMN IF NOT EXISTS created_at timestamp without time zone DEFAULT now() NOT NULL,
ADD COLUMN IF NOT EXISTS updated_at timestamp without time zone DEFAULT now() NOT NULL,
ADD CONSTRAINT valid_minutes CHECK (completion_time_minutes BETWEEN 0 AND 59);

ALTER TABLE user_challenges RENAME TO challenge_results;
ALTER TABLE challenge_results RENAME COLUMN users_id TO user_id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE challenge_results RENAME TO user_challenges;
    ALTER TABLE user_challenges RENAME COLUMN user_id TO users_id;
ALTER TABLE user_challenges DROP COLUMN IF EXISTS id,
DROP COLUMN IF EXISTS completion_time_hour,
DROP COLUMN IF EXISTS completion_time_minutes,
DROP COLUMN IF EXISTS created_at,
DROP COLUMN IF EXISTS updated_at,
ADD PRIMARY KEY(challenge_id, users_id);
`);
  }
}
