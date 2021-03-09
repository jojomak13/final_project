abstract class CustomError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  /**
   * Request Status Code
   * @type: number
   */
  abstract statusCode: number;

  /**
   * Serialize method
   * @return Object
   */
  abstract serialize(): {
    type: string;
    errors: {
      message: string;
      field?: string;
    }[];
  };
}

export { CustomError };
