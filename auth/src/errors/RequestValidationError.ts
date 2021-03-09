import { ValidationError } from 'joi';
import { CustomError } from './CutsomError';

class RequestValidationError extends CustomError {
  private errors: ValidationError[];
  public statusCode: number = 400;

  constructor(errors: ValidationError[]) {
    super('Validation error');

    this.errors = errors;
    this.name = 'Request Validation Error';

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serialize() {
    // @ts-ignore
    const errors = this.errors.details.map((err) => {
      return { message: err.message, field: err.context.label };
    });

    return { type: this.name, errors };
  }
}

export { RequestValidationError };
