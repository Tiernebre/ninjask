type JSONifiedSessionTokenBag = {
  readonly accessToken: string;
};

export class SessionTokenBag {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string
  ) {}

  toJSON(): JSONifiedSessionTokenBag {
    return {
      accessToken: this.accessToken,
    };
  }
}
