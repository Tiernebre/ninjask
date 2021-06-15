import { MigrationInterface, QueryRunner } from "typeorm";

export class WebSocketSessionTicketSchema1623730646753
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS live_session_ticket (
                token UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
                redeemed BOOLEAN NOT NULL DEFAULT false,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                user_id INTEGER NOT NULL REFERENCES users (id)
            );
            CREATE INDEX live_session_ticket_redeemed_idx ON live_session_ticket (redeemed);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
