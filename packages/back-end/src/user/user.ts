type JSONifiedUser = {
  id: number;
  accessKey: string
}

export class User {
  constructor(public readonly id: number, public readonly accessKey: string, public tokenVersion: number) {}

  toJSON(): JSONifiedUser { 
    return {
      id: this.id,
      accessKey: this.accessKey
    }
  }
}
