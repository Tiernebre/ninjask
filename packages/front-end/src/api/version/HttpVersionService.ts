import { HttpClient } from "../http";
import { Version } from "./Version";
import { VersionService } from "./VersionService";

export class HttpVersionService implements VersionService {
  constructor(private readonly versionHttpClient: HttpClient) {}

  async getAll(): Promise<Version[]> {
    return this.versionHttpClient.get("versions");
  }
}
