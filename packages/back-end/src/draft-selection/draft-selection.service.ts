import { Repository } from "typeorm";
import { DraftSelectionEntity } from "./draft-selection.entity";

export class DraftSelectionService {
  constructor(
    private readonly draftSelectionRepository: Repository<DraftSelectionEntity>
  ) {}
}