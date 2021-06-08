import { ZodError } from "zod";
import { PokemonService } from "../pokemon";
import { DraftSelectionService } from "./draft-selection.service";
import { object, when } from "testdouble";
import { DraftSelectionRepository } from "./draft-selection.repository";
import { generateMockPokemon } from "../pokemon/pokemon.mock";
import { generateMockDraftSelectionRow } from "./draft-selection.mock";
import { generateRandomNumber } from "../random";
import { last } from "lodash";
import { DraftSelection } from "./draft-selection";

describe("DraftSelectionService", () => {
  let draftSelectionService: DraftSelectionService;
  let draftSelectionRepository: DraftSelectionRepository;
  let pokemonService: PokemonService;

  beforeEach(() => {
    draftSelectionRepository = object<DraftSelectionRepository>();
    pokemonService = object<PokemonService>();
    draftSelectionService = new DraftSelectionService(
      draftSelectionRepository,
      pokemonService
    );
  });

  describe("getAllForDraft", () => {
    it.each([null, undefined, "", NaN])(
      "throws a ZodError if draft id given = %p",
      async (draftId: unknown) => {
        await expect(
          draftSelectionService.getAllForDraft(draftId as number)
        ).rejects.toThrowError(ZodError);
      }
    );

    it("properly maps a pokemon for each found draft selection", async () => {
      const expectedPokemon = [generateMockPokemon(), generateMockPokemon()];
      const rowsFound = [
        generateMockDraftSelectionRow(),
        generateMockDraftSelectionRow(),
      ];
      rowsFound.forEach((rowFound, index) => {
        when(
          pokemonService.getOneById(rowFound.pokemonId as number)
        ).thenResolve(expectedPokemon[index]);
      });
      const draftId = generateRandomNumber();
      when(draftSelectionRepository.getAllForDraftId(draftId)).thenResolve(
        rowsFound
      );
      const gottenSelections = await draftSelectionService.getAllForDraft(
        draftId
      );
      gottenSelections.forEach((gottenSelection, index) => {
        expect(gottenSelection.selection).toEqual(expectedPokemon[index]);
      });
    });

    it("maps the found pokemon as null if a row does not have a pokemon ID", async () => {
      const expectedPokemon = [generateMockPokemon()];
      const rowsFound = [
        generateMockDraftSelectionRow(),
        generateMockDraftSelectionRow(null),
      ];
      rowsFound.forEach((rowFound, index) => {
        when(
          pokemonService.getOneById(rowFound.pokemonId as number)
        ).thenResolve(expectedPokemon[index]);
      });
      const draftId = generateRandomNumber();
      when(draftSelectionRepository.getAllForDraftId(draftId)).thenResolve(
        rowsFound
      );
      const gottenSelections = await draftSelectionService.getAllForDraft(
        draftId
      );
      const lastSelection = last(gottenSelections) as DraftSelection;
      expect(lastSelection.selection).toBeNull();
    });
  });
});
