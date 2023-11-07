
/**
 * Moved to separate service, so we can have a promise with return types (when using TypeScript).
 */
export class UtilityService {

  /**
   * Tests if the given value is numeric.
   *
   * @param value The string value to test
   * @returns The number or 0 if not recognized as number
   */
  public static isNumeric(value: string): number {
    return /^[0-9]+$/.test(value) ? parseInt(value, 10) : 0;
  }

}
