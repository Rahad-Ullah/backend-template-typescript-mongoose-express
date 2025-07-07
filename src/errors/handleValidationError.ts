import { Error } from 'mongoose';
import { IErrorMessage } from '../types/errors.types';

const handleValidationError = (error: Error.ValidationError) => {
  const errorMessages: IErrorMessage[] = Object.values(error.errors).map(
    (el: Error.ValidatorError | Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleValidationError;
