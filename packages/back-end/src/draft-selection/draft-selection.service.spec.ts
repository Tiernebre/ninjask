import { ZodError } from "zod";
import { Pokemon, PokemonService } from "../pokemon";
import { DraftSelectionService } from "./draft-selection.service";
import { object, when } from "testdouble";
import { DraftSelectionRepository } from "./draft-selection.repository";
import { generateMockPokemon } from "../pokemon/pokemon.mock";
import {
  generateMockDraftSelectionEntity,
  generateMockDraftSelectionRow,
  generateMockFinalizeDraftSelectionRequest,
} from "./draft-selection.mock";
import { generateRandomNumber } from "../random";
import { last } from "lodash";
import { DraftSelection } from "./draft-selection";
import { INVALID_NUMBER_CASES, NEGATIVE_NUMBER_CASES } from "../test/cases";
import { BadRequestError, ConflictError, NotFoundError } from "../error";
import { DraftPokemonService } from "../draft-pokemon/draft-pokemon.service";
import { generateMockDraftPokemon } from "../draft-pokemon/draft-pokemon.mock";
import { FinalizeDraftSelectionRequest } from "./finalize-draft-selection-request";
import { DraftSelectionEntity } from ".";
import { DraftPokemon } from "../draft-pokemon";

describe("DraftSelectionService", () => {
  let draftSelectionService: DraftSelectionService;
  let draftSelectionRepository: DraftSelectionRepository;
  let pokemonService: PokemonService;
  let draftPokemonService: DraftPokemonService;

  beforeEach(() => {
    draftSelectionRepository = object<DraftSelectionRepository>();
    pokemonService = object<PokemonService>();
    draftPokemonService = object<DraftPokemonService>();
    draftSelectionService = new DraftSelectionService(
      draftSelectionRepository,
      pokemonService,
      draftPokemonService
    );
  });

  describe("getAllForDraft", () => {
    it.each([...INVALID_NUMBER_CASES])(
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

  describe("finalizeOneForUser", () => {
    let id: number;
    let userId: number;
    let request: FinalizeDraftSelectionRequest;
    let draftSelectionEntity: DraftSelectionEntity;
    let pokemonToSelect: DraftPokemon;
    let expectedPokemon: Pokemon;

    beforeEach(() => {
      id = generateRandomNumber();
      userId = generateRandomNumber();
      request = generateMockFinalizeDraftSelectionRequest();
      draftSelectionEntity = generateMockDraftSelectionEntity();
      pokemonToSelect = generateMockDraftPokemon({
        draftId: draftSelectionEntity.draftId,
      });
      expectedPokemon = generateMockPokemon();

      when(
        draftSelectionRepository.getPendingOneWithIdAndUserId(id, userId)
      ).thenResolve(draftSelectionEntity);
      when(
        draftSelectionRepository.getNumberOfPendingSelectionsBeforeSelection(
          draftSelectionEntity
        )
      ).thenResolve(0);
      when(
        draftSelectionRepository.oneExistsWithPokemonId(request.draftPokemonId)
      ).thenResolve(false);
      when(draftPokemonService.getOneById(request.draftPokemonId)).thenResolve(
        pokemonToSelect
      );
      when(pokemonService.getOneById(pokemonToSelect.pokemonId)).thenResolve(
        expectedPokemon
      );
    });

    it.each([...INVALID_NUMBER_CASES, ...NEGATIVE_NUMBER_CASES])(
      "throws a ZodError if id provided is %p",
      async (id: unknown) => {
        await expect(
          draftSelectionService.finalizeOneForUser(id as number, 1, {
            draftPokemonId: 1,
          })
        ).rejects.toThrowError(ZodError);
      }
    );

    it.each([...INVALID_NUMBER_CASES, ...NEGATIVE_NUMBER_CASES])(
      "throws a ZodError if userId provided is %p",
      async (userId: unknown) => {
        await expect(
          draftSelectionService.finalizeOneForUser(1, userId as number, {
            draftPokemonId: 1,
          })
        ).rejects.toThrowError(ZodError);
      }
    );

    it.each([...INVALID_NUMBER_CASES, ...NEGATIVE_NUMBER_CASES])(
      "throws a ZodError if draftPokemonId provided is %p",
      async (draftPokemonId: unknown) => {
        await expect(
          draftSelectionService.finalizeOneForUser(1, 1, {
            draftPokemonId: draftPokemonId as number,
          })
        ).rejects.toThrowError(ZodError);
      }
    );

    it("throws a NotFoundError if the information provided did not detect a draft selection", async () => {
      when(
        draftSelectionRepository.getPendingOneWithIdAndUserId(id, userId)
      ).thenResolve(undefined);
      await expect(
        draftSelectionService.finalizeOneForUser(id, userId, request)
      ).rejects.toThrowError(NotFoundError);
    });

    it("throws a BadRequestError if the pick is not ready to be finalized", async () => {
      when(
        draftSelectionRepository.getNumberOfPendingSelectionsBeforeSelection(
          draftSelectionEntity
        )
      ).thenResolve(1);
      await expect(
        draftSelectionService.finalizeOneForUser(id, userId, request)
      ).rejects.toThrowError(BadRequestError);
    });

    it("throws a ConflictError if the pokemon id provided in the request has already been chosen", async () => {
      when(
        draftSelectionRepository.oneExistsWithPokemonId(request.draftPokemonId)
      ).thenResolve(true);
      await expect(
        draftSelectionService.finalizeOneForUser(id, userId, request)
      ).rejects.toThrowError(ConflictError);
    });

    it("throws a ConflictError if the pokemon to draft does not actually belong to the same draft", async () => {
      when(draftPokemonService.getOneById(request.draftPokemonId)).thenResolve(
        generateMockDraftPokemon({ draftId: draftSelectionEntity.draftId + 1 })
      );
      await expect(
        draftSelectionService.finalizeOneForUser(id, userId, request)
      ).rejects.toThrowError(ConflictError);
    });

    it("returns a mapped DraftSelection if it was finalized", async () => {
      const finalizedSelection = await draftSelectionService.finalizeOneForUser(
        id,
        userId,
        request
      );
      expect(finalizedSelection).toBeTruthy();
      expect(finalizedSelection.selection).toEqual(expectedPokemon);
    });
  });
});
