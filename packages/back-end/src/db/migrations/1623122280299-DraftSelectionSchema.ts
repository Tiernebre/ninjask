import {MigrationInterface, QueryRunner} from "typeorm";

export class DraftSelectionSchema1623122280299 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS draft_selection (
            id SERIAL PRIMARY KEY NOT NULL,
            challenge_participant_id INTEGER REFERENCES challenge_participants (id) NOT NULL,
            round INTEGER NOT NULL,
            pick_number INTEGER NOT NULL,
            pokemon_id INTEGER REFERENCES draft_pokemon (id) NULL UNIQUE,
            CONSTRAINT valid_round CHECK (round BETWEEN 1 AND 6)
        );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS draft_selection;
        `)
    }

}
