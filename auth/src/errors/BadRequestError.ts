import { CustomError } from './CutsomError';

class BadRequestError extends CustomError {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number = 400) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serialize() {
    return { type: this.name, errors: [{ message: this.message }] };
  }
}

export { BadRequestError };
