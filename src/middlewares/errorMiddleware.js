class BadRequestError extends Error {
    constructor(message = 'Bad Request') {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}

class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

class NotFoundError extends Error {
    constructor(message = 'Not Found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class ConflictError extends Error {
    constructor(message = 'Conflict') {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
    }
}

class InternalServerError extends Error {
    constructor(message = 'Internal Server Error') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
    }
}

function errorMiddleware(error, req, res, next) {
    // 터미널에 노란색으로 출력됨.
    console.log('\x1b[33m%s\x1b[0m', error);

    const { statusCode, message } = error;

    res.status(statusCode).send({ message });
}

export { BadRequestError, UnauthorizedError, NotFoundError, ConflictError, InternalServerError, errorMiddleware };
