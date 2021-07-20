import { v4 as uuid } from "uuid";

type User = {
  accessKey: string;
  password: string;
};

export const testUser: User = {
  accessKey: uuid(),
  password: uuid(),
};
