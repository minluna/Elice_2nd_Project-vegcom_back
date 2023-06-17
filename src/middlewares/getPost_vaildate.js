import { BadRequestError } from './errorMiddleware.js';

const getPost_validate = (req, res, next) => {
    const cursor = req.params.cursor;
    if (!cursor || isNaN(cursor)) {
        throw new BadRequestError('포스트의 커서값을 확인해주세요.');
    }

    next();
};

export { getPost_validate };
