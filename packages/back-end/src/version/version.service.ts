export interface VersionService {
  getOneById(id: number): Promise<void>
}