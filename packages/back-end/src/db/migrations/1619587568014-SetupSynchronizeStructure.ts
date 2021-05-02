import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateFromSynchronize1619587568014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    access_key uuid NOT NULL UNIQUE,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    token_version INTEGER DEFAULT 0 NOT NULL
);
CREATE TABLE IF NOT EXISTS league (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);
CREATE TABLE IF NOT EXISTS season (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    league_id INTEGER REFERENCES league (id)
);
CREATE TABLE IF NOT EXISTS challenge (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    version_id INTEGER NOT NULL,
    season_id INTEGER REFERENCES season (id)
);
CREATE TABLE challenge_users_users (
    challenge_id INTEGER REFERENCES challenge (id) NOT NULL,
    users_id INTEGER REFERENCES users (id) NOT NULL,
    PRIMARY KEY (challenge_id, users_id)
);
CREATE INDEX challenge_users_users_challenge_id_idx on challenge_users_users (challenge_id);
CREATE INDEX challenge_users_users_user_id_idx on challenge_users_users (users_id);

CREATE TABLE IF NOT EXISTS draft (
    id SERIAL PRIMARY KEY,
    pool_size INTEGEREGER NOT NULL DEFAULT 20,
    live_pool_pokemon_index INTEGEREGER DEFAULT '-1'::integer NOT NULL,
    challenge_id INTEGER REFERENCES challenge (id) UNIQUE
);
CREATE TABLE IF NOT EXISTS draft_pokemon (
    id SERIAL PRIMARY KEY,
    pokemon_id INTEGEREGER NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    draft_id INTEGER REFERENCES draft (id)
);
CREATE TABLE IF NOT EXISTS version_denied_pokemon (
    id SERIAL PRIMARY KEY,
    version_id INTEGEREGER NOT NULL,
    pokemon_id INTEGEREGER NOT NULL
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
