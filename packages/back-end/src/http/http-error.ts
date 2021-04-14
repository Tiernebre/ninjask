export class HttpError extends Error {
  constructor() {
    super('An HTTP Error Occurred')
  }
}