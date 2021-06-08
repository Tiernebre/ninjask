import { ZodError } from "zod";
import { PokemonService } from "../pokemon";
import { DraftSelectionService } from "./draft-selection.service"
import { object } from 'testdouble';
import { DraftSelectionRepository } from "./draft-selection.repository";

describe("DraftSelectionService", () => {
  let draftSelectionService: DraftSelectionService;
  let draftSelectionRepository: DraftSelectionRepository;
  let pokemonService: PokemonService;

  beforeEach(() => {
    draftSelectionRepository = object<DraftSelectionRepository>()
    pokemonService = object<PokemonService>()
    draftSelectionService = new DraftSelectionService(
      draftSelectionRepository,
      pokemonService
    )
  })

  describe("getAllForDraft", () => {
    it.each([null, undefined, '', NaN])("throws a ZodError if draft id given = %p", async (draftId: unknown) => {
      await expect(draftSelectionService.getAllForDraft(draftId as number)).rejects.toThrowError(ZodError)
    })
  })
})