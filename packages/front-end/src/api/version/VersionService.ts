import { Version } from "./Version";

export interface VersionService {
  getAll(): Version[];
}
