import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIndexForPokemonIdOnDraftSelection1623215125411
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
