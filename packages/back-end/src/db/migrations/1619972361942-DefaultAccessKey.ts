import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultAccessKey1619972361942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            ALTER TABLE users ALTER COLUMN access_key SET DEFAULT uuid_generate_v4();
        `.trim()
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            ALTER TABLE users ALTER COLUMN access_key SET DEFAULT null;
            DROP EXTENSION IF EXISTS "uuid-ossp";
        `.trim()
    );
  }
}
