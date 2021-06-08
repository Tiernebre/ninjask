import { DraftSelection, DraftSelectionRow } from "./draft-selection";
import { z } from "zod";
import { Pokemon, PokemonService } from "../pokemon";
import { DraftSelectionRepository } from "./draft-selection.repository";

export class DraftSelectionService {
  constructor(
    private readonly draftSelectionRepository: DraftSelectionRepository,
    private readonly pokemonService: PokemonService
  ) {}

  public async getAllForDraft(draftId: number): Promise<DraftSelection[]> {
    z.number().parse(draftId);

    const foundSelections = await this.draftSelectionRepository.getAllForDraftId(draftId)
    return Promise.all(foundSelections.map(async (foundSelection) => ({
      ...foundSelection,
      selection: await this.getPokemonForDraftSelection(foundSelection)
    })))
  }

  private async getPokemonForDraftSelection(draftSelection: DraftSelectionRow): Promise<Pokemon | null> {
    if (draftSelection.pokemonId) {
      return this.pokemonService.getOneById(draftSelection.pokemonId) 
    } else {
      return null
    }
  }
}
