type ErrorCodes = 400 | 401 | 403 | 404 | 500;

export class HttpError extends Error {
  constructor(public code: ErrorCodes, public message: string) {
    super(message);
  }
}

export class NotFound extends HttpError {
  constructor(public message = "Resource not found") {
    super(404, message);
  }
}
