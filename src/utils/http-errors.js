/* eslint-disable max-classes-per-file */
/**
 *
 */
class HttpError extends Error {
  /**
   * Create a new HTTP error.
   * @param {number} status - The HTTP status code of the error.
   * @param {string} message - The error message.
   */
  constructor(status, error, message) {
    super();
    this.status = status;
    this.error = error;
    this.message = message;
  }
}

/**
 *
 */
class BadRequestError extends HttpError {
  /**
   * Create a new `BadRequest` error.
   * @param {string} [message='Bad Request'] - The error message.
   */
  constructor(message) {
    super(400, 'Bad Request', message);
  }
}

/**
 *
 */
class AccessDeniedError extends HttpError {
  /**
   * Create a new `AccessDenied` error.
   * @param {string} [message='Access Denied'] - The error message.
   */
  constructor(message) {
    super(401, 'Access denied', message);
  }
}

/**
 *
 */
class UnauthorizedError extends HttpError {
  /**
   * Create a new `Unauthorized` error.
   * @param {string} [message='Unauthorized'] - The error message.
   */
  constructor(message) {
    super(403, 'Unauthorized', message);
  }
}

/**
 *
 */
class ForbiddenError extends HttpError {
  /**
   * Create a new `Forbidden` error.
   * @param {string} [message='Forbidden'] - The error message.
   */
  constructor(message) {
    super(403, 'Forbidden', message);
  }
}

/**
 *
 */
class NotFoundError extends HttpError {
  /**
   * Create a new `NotFound` error.
   * @param {string} [message='Not Found'] - The error message.
   */
  constructor(message) {
    super(404, 'Not Found', message);
  }
}

/**
 *
 */
class MethodNotAllowedError extends HttpError {
  /**
   * Create a new `MethodNotAllowed` error.
   * @param {string} [message='Method Not Allowed'] - The error message.
   */
  constructor(message) {
    super(405, 'Method Not Allowed', message);
  }
}

/**
 *
 */
class ConflictError extends HttpError {
  /**
   * Create a new `Conflict` error.
   * @param {string} [message='Conflict'] - The error message.
   */
  constructor(message) {
    super(408, 'Conflict', message);
  }
}

/**
 *
 */
class UnSupportedMediaTypeError extends HttpError {
  /**
   * Create a new `UnsupportedMediaType` error.
   * @param {string} [message='Unsupported Media Type'] - The error message.
   */
  constructor(message) {
    super(415, 'Unsupported Media Type', message);
  }
}

/**
 *
 */
class UnProcessableEntityError extends HttpError {
  /**
   * Create a new `UnProcessableEntity` error.
   * @param {string} [message='Unprocessable Entity'] - The error message.
   */
  constructor(message) {
    super(422, 'Unprocessable Entity', message);
  }
}

/**
 *
 */
class InternalServerError extends HttpError {
  /**
   * Create a new `InternalServer` error.
   * @param {string} [message='Inter Server Error'] - The error message.
   */
  constructor(message) {
    super(500, 'Internal Server Error', message);
  }
}

export {
  HttpError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  AccessDeniedError,
  InternalServerError,
  MethodNotAllowedError,
  UnProcessableEntityError,
  UnSupportedMediaTypeError,
};
