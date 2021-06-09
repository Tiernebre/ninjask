import { DraftSelection, DraftSelectionRow } from "./draft-selection";
import { z } from "zod";
import { Pokemon, PokemonService } from "../pokemon";
import { DraftSelectionRepository } from "./draft-selection.repository";
import {
  FinalizeDraftSelectionRequest,
  finalizeDraftSelectionRequestSchema,
} from "./finalize-draft-selection-request";
import { BadRequestError, NotFoundError } from "../error";

export class DraftSelectionService {
  constructor(
    private readonly draftSelectionRepository: DraftSelectionRepository,
    private readonly pokemonService: PokemonService
  ) {}

  public async getAllForDraft(draftId: number): Promise<DraftSelection[]> {
    z.number().parse(draftId);

    const foundSelections =
      await this.draftSelectionRepository.getAllForDraftId(draftId);
    return Promise.all(
      foundSelections.map(async (foundSelection) =>
        this.mapRowToDto(foundSelection)
      )
    );
  }

  public async finalizeOneForUser(
    id: number,
    userId: number,
    request: FinalizeDraftSelectionRequest
  ): Promise<void> {
    z.number().positive().parse(id);
    z.number().positive().parse(userId);
    finalizeDraftSelectionRequestSchema.parse(request);

    const draftSelection = await this.draftSelectionRepository.findOne(id);
    if (!draftSelection) {
      throw new NotFoundError(
        `Could not find draft selection with id = ${id} for user = ${userId}`
      );
    }

    const priorPendingSelections = await this.draftSelectionRepository.getPendingSelectionsBeforeSelection(draftSelection)
    if (priorPendingSelections.length) {
      throw new BadRequestError("The Draft Selection is not ready to be finalized yet. There are still pending picks before this one.")
    }

    await this.draftSelectionRepository.update(
      { pokemonId: request.draftPokemonId },
      draftSelection
    );
  }

  private async mapRowToDto(row: DraftSelectionRow): Promise<DraftSelection> {
    return {
      ...row,
      selection: await this.getPokemonForDraftSelection(row),
    };
  }

  private async getPokemonForDraftSelection(
    draftSelection: DraftSelectionRow
  ): Promise<Pokemon | null> {
    if (draftSelection.pokemonId) {
      return this.pokemonService.getOneById(draftSelection.pokemonId);
    } else {
      return null;
    }
  }
}
