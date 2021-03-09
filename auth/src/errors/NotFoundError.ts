import { CustomError } from './CutsomError';

class NotFoundError extends CustomError {
  public statusCode: number = 404;

  constructor() {
    super('Notfound Error');

    this.name = 'NotfoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return {
      type: this.name,
      errors: [{ message: 'Not Found' }],
    };
  }
}

export { NotFoundError };
