import { Repository } from "typeorm";
import { ZodError } from "zod";
import { PokemonService } from "../pokemon";
import { DraftSelectionEntity } from "./draft-selection.entity";
import { DraftSelectionService } from "./draft-selection.service"

describe("DraftSelectionService", () => {
  let draftSelectionService: DraftSelectionService;
  let draftSelectionRepository: Repository<DraftSelectionEntity>;
  let pokemonService: PokemonService;

  beforeEach(() => {
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