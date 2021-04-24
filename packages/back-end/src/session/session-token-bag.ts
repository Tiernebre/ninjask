type JSONifiedSessionTokenBag = {
  readonly accessToken: string;
};

export class SessionTokenBag {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly accessTokenExpiration: number
  ) {}

  toJSON(): JSONifiedSessionTokenBag {
    return {
      accessToken: this.accessToken,
    };
  }
}
