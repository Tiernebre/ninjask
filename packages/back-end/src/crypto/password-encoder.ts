export interface PasswordEncoder {
  /**
   * Encodes a raw password into an encoded version.
   *
   * @param rawPassword The raw password to encode.
   * @returns The newly encoded password
   */
  encode(rawPassword: string): Promise<string>;

  /**
   * Verify the encoded password obtained from storage matches the submitted raw password
   * after it too has encoded. Returns true if the passwords match, false if they do note.
   *
   * The stored password itself is never decoded.
   *
   * @param rawPassword the raw password to encode and match
   * @param encodedPassword the encoded password from storage to compare with
   * @returns true if the raw password, after encoding, matches the encoded password from storage.
   */
  matches(rawPassword: string, encodedPassword: string): Promise<boolean>;
}
