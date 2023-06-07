import { BadRequestError, UnauthorizedError, NotFoundError, ConflictError, InternalServerError } from '../../errors.js';

function errorMiddleware(error, req, res, next) {
    // 터미널에 노란색으로 출력됨.
    console.log('\x1b[33m%s\x1b[0m', error);

    const { statusCode, message } = error;

    res.status(statusCode).send({ message });
}

export { errorMiddleware };
