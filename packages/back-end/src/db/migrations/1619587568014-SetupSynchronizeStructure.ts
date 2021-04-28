import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateFromSynchronize1619587568014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    access_key uuid NOT NULL UNIQUE,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    token_version BIGINT DEFAULT 0 NOT NULL
);
CREATE TABLE IF NOT EXISTS league (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE IF NOT EXISTS season (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    league_id BIGINT REFERENCES league (id)
);
CREATE TABLE IF NOT EXISTS challenge (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    version_id BIGINT NOT NULL,
    season_id BIGINT REFERENCES season (id)
);
CREATE TABLE challenge_users_users (
    challenge_id BIGINT REFERENCES challenge (id) NOT NULL,
    users_id BIGINT REFERENCES users (id) NOT NULL,
    PRIMARY KEY (challenge_id, users_id)
);
CREATE INDEX challenge_users_users_challenge_id_idx on challenge_users_users (challenge_id);
CREATE INDEX challenge_users_users_user_id_idx on challenge_users_users (users_id);

CREATE TABLE IF NOT EXISTS draft (
    id BIGSERIAL PRIMARY KEY,
    pool_size INTEGER NOT NULL DEFAULT 20,
    live_pool_pokemon_index INTEGER DEFAULT '-1'::integer NOT NULL,
    challenge_id BIGINT REFERENCES challenge (id) UNIQUE
);
CREATE TABLE IF NOT EXISTS draft_pokemon (
    id BIGSERIAL PRIMARY KEY,
    pokemon_id INTEGER NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    draft_id BIGINT REFERENCES draft (id)
);
CREATE TABLE IF NOT EXISTS version_denied_pokemon (
    id BIGSERIAL PRIMARY KEY,
    version_id INTEGER NOT NULL,
    pokemon_id INTEGER NOT NULL
);
      `.trim()
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS version_denied_pokemon;
      DROP TABLE IF EXISTS draft_pokemon;
      DROP TABLE IF EXISTS draft;
      DROP TABLE IF EXISTS challenge_users_user;
      DROP TABLE IF EXISTS challenge;
      DROP TABLE IF EXISTS season;
      DROP TABLE IF EXISTS league;
      DROP TABLE IF EXISTS users;
    `);
  }
}