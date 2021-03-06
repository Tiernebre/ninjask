export interface Draft {
  readonly id: number;
  readonly poolSize: number;
  readonly extraPoolSize: number;
  readonly livePoolingHasFinished: boolean;
  readonly challengeId: number;
  readonly numberOfRounds: number;
}
