import { Repository } from "typeorm";
import { VersionService } from "../version/version.service";
import { DraftEntity } from "./draft.entity";

export class DraftService {
  constructor(
    private readonly draftRepository: Repository<DraftEntity>,
    private readonly versionService: VersionService
  ) {}

  public async generatePoolOfPokemonForOneWithId(id: number): Promise<void> {
    const draft = await this.draftRepository.findOne(id);

    if (draft) {
      const challenge = await draft.challenge;
      const version = await this.versionService.getOneById(challenge.versionId);
    }
  }
}
