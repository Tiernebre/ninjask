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
        
      ALTER TABLE draft
      DROP CONSTRAINT draft_challenge_id_fkey,
      ADD CONSTRAINT draft_challenge_id_fkey
        FOREIGN KEY (challenge_id)
        REFERENCES challenge (id)
        ON DELETE CASCADE;
        
      ALTER TABLE draft_pokemon
      DROP CONSTRAINT draft_pokemon_draft_id_fkey,
      ADD CONSTRAINT draft_pokemon_draft_id_fkey
        FOREIGN KEY (draft_id)
        REFERENCES draft (id)
        ON DELETE CASCADE;
        
      ALTER TABLE draft_selection
      DROP CONSTRAINT draft_selection_challenge_participant_id_fkey,
      ADD CONSTRAINT draft_selection_challenge_participant_id_fkey
        FOREIGN KEY (challenge_participant_id)
        REFERENCES challenge_participants (id)
        ON DELETE CASCADE;
        
      ALTER TABLE draft_selection
      DROP CONSTRAINT draft_selection_draft_id_fkey,
      ADD CONSTRAINT draft_selection_draft_id_fkey
        FOREIGN KEY (draft_id)
        REFERENCES draft (id)
        ON DELETE CASCADE;
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("");
  }
}
