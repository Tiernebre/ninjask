import { object, verify, when } from "testdouble";
import { Pokemon } from "../pokemon/pokemon";
import { generateMockPokemon } from "../pokemon/pokemon.mock";
import { PokemonService } from "../pokemon/pokemon.service";
import { generateRandomNumber } from "../random";
import { generateMockDraftEntity } from "./draft.mock";
import { DraftService } from "./draft.service";
import { LiveDraftPool } from "./live-draft-pool";
import { LiveDraftPoolService } from "./live-draft-pool.service";

describe("LiveDraftPoolService", () => {
  let liveDraftPoolService: LiveDraftPoolService;
  let draftService: DraftService;
  let pokemonService: PokemonService;

  beforeEach(() => {
    draftService = object<DraftService>();
    pokemonService = object<PokemonService>();
    liveDraftPoolService = new LiveDraftPoolService(
      draftService,
      pokemonService
    );
  });

  describe("getLiveDraftPoolForOneWithId", () => {
    it("returns the current state of live draft pool for a given draft id", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      draft.livePoolPokemonIndex = 0;
      const draftPokemon: Pokemon[] = (await draft.pokemon).map((pokemon) => {
        const expectedPokemon = generateMockPokemon();
        when(pokemonService.getOneById(pokemon.pokemonId)).thenResolve(
          expectedPokemon
        );
        return expectedPokemon;
      });
      when(draftService.getOneAsEntityWithPool(id)).thenResolve(draft);
      const expected: LiveDraftPool = {
        draftId: draft.id,
        currentPokemon: draftPokemon[draft.livePoolPokemonIndex],
        currentIndex: draft.livePoolPokemonIndex,
        pooledPokemon: [draftPokemon[0]],
        isPoolOver: false,
      };
      const gotten = await liveDraftPoolService.getLiveDraftPoolForOneWithId(
        id
      );
      expect(gotten).toEqual(expected);
    });

    it("returns the current pokemon as null if draft index did not find a pokemon", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      draft.livePoolPokemonIndex = -1;
      when(draftService.getOneAsEntityWithPool(id)).thenResolve(draft);
      const gotten = await liveDraftPoolService.getLiveDraftPoolForOneWithId(
        id
      );
      expect(gotten.currentPokemon).toBeNull();
    });
  });

  describe("revealNextPokemonInLivePoolForId", () => {
    it("reveals the next pokemon by incrementing the draft", async () => {
      const id = generateRandomNumber();
      const draft = generateMockDraftEntity();
      draft.livePoolPokemonIndex = 0;
      const draftPokemon: Pokemon[] = (await draft.pokemon).map((pokemon) => {
        const expectedPokemon = generateMockPokemon();
        when(pokemonService.getOneById(pokemon.pokemonId)).thenResolve(
          expectedPokemon
        );
        return expectedPokemon;
      });
      when(draftService.getOneAsEntityWithPool(id)).thenResolve(draft);
      const expected: LiveDraftPool = {
        draftId: draft.id,
        currentPokemon: draftPokemon[draft.livePoolPokemonIndex],
        currentIndex: draft.livePoolPokemonIndex,
        pooledPokemon: [draftPokemon[0]],
        isPoolOver: false,
      };
      const gotten =
        await liveDraftPoolService.revealNextPokemonInLivePoolForId(id);
      expect(gotten).toEqual(expected);
      verify(draftService.incrementPoolIndexForOneWithId(id));
    });
  });
});
