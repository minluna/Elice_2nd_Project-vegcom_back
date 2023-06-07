const BadRequestError = (name, message = '', statusCode = 400) => ({
    name,
    message,
    statusCode,
});

const UnauthorizedError = (name, message = '', statusCode = 401) => ({
    name,
    message,
    statusCode,
});

const NotFoundError = (name, message = '', statusCode = 404) => ({
    name,
    message,
    statusCode,
});

const ConflictError = (name, message = '', statusCode = 409) => ({
    name,
    message,
    statusCode,
});

const InternalServerError = (name, message = '', statusCode = 500) => ({
    name,
    message,
    statusCode,
});

export { BadRequestError, UnauthorizedError, NotFoundError, ConflictError, InternalServerError };
