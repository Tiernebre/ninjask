export enum LiveDraftSelectionMessageType {
  FINALIZE_SELECTION = "FINALIZE_SELECTION",
}

export type LiveDraftSelectionMessage = {
  draftPokemonId: number;
  type: LiveDraftSelectionMessageType;
  selectionId: number;
};
