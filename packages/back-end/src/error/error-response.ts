export type ErrorResponse = {
  status: string;
  code: number;
  message: string | Record<string, unknown>;
};
