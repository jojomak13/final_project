import { CustomError } from './CutsomError';

class DatabaseError extends CustomError {
  private reason: string = 'Error while connecting to database';
  public statusCode: number = 500;

  constructor() {
    super('Error while connecting to database');

    this.name = 'DatabaseError';
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  public serialize() {
    return { type: this.name, errors: [{ message: this.reason }] };
  }
}

export { DatabaseError };
