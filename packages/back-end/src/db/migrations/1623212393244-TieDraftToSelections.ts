import {MigrationInterface, QueryRunner} from "typeorm";

export class TieDraftToSelections1623212393244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE IF EXISTS draft_selection ADD COLUMN IF NOT EXISTS draft_id INTEGER REFERENCES draft (id) NOT NULL;
            ALTER TABLE draft_selection ADD CONSTRAINT unique_draft_selection UNIQUE (draft_id, round_number, pick_number);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE IF EXISTS draft_selection DROP CONSTRAINT unique_draft_selection;
            ALTER TABLE IF EXISTS draft_selection DROP COLUMN draft_id;
        `)
    }

}
