import { Repository } from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { getRandomInt } from "../random";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import { DraftEntity } from "./draft.entity";

export const seedDrafts = async (
  repository: Repository<DraftEntity>,
  count = 20,
  challenge?: ChallengeEntity
): Promise<DraftEntity[]> => {
  const drafts = [];
  for (let i = 0; i < count; i++) {
    const draft = repository.create();
    draft.extraPoolSize = getRandomInt(1, 40);
    if (challenge) {
      draft.challenge = Promise.resolve(challenge);
    }
    drafts.push(draft);
  }
  return repository.save(drafts);
};

export const seedDraft = async (
  repository: Repository<DraftEntity>,
  challenge?: ChallengeEntity
): Promise<DraftEntity> => {
  const [draft] = await seedDrafts(repository, 1, challenge);
  return draft;
};

export const seedDraftPokemon = async (
  repository: Repository<DraftPokemonEntity>,
  draft: DraftEntity,
  count = 20
): Promise<DraftPokemonEntity[]> => {
  const draftPokemon = [];
  for (let i = 0; i < count; i++) {
    const draftPokemonToGenerate = repository.create();
    draftPokemonToGenerate.pokemonId = getRandomInt(0, 900);
    draftPokemonToGenerate.draft = draft;
    draftPokemon.push(draftPokemonToGenerate);
  }
  return repository.save(draftPokemon);
};
