type JSONifiedSession = {
  readonly accessToken: string;
  readonly accessTokenExpiration: number;
};

export class Session {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly accessTokenExpiration: number
  ) {}

  toJSON(): JSONifiedSession {
    return {
      accessToken: this.accessToken,
      accessTokenExpiration: this.accessTokenExpiration
    };
  }
}
