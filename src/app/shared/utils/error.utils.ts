import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

/**  */
export type GetGenericErrorMessageOptions = {
  /**
   * Message to be shown if 404 error occurs.
   *
   * @defaultValue `error.error.message`
   *  */
  notFoundMessage?: string;
  /**
   * Message to be shown if unknown error of `Error` type occurs.
   *
   * @defaultValue `error.message`
   *  */
  errorMessage?: string;
  /**
   * Message to be shown if other other checks fail.
   *
   * @defaultValue {@link DEFAULT_ERROR_MESSAGE}
   *  */
  defaultMessage?: string;
};

/**
 * Get generic error message based on error type.
 *
 * @returns Matched error message.
 *  */
export function getGenericErrorMessage(error: unknown, options?: GetGenericErrorMessageOptions): string {
  if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.NotFound) {
    return options?.notFoundMessage ?? error.error.message;
  }

  if (error instanceof Error) {
    return options?.errorMessage ?? error.message;
  }

  return options?.defaultMessage ?? DEFAULT_ERROR_MESSAGE;
}
