import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const search_validate = (req, res, next) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        throw new BadRequestError('검색 값을 확인해주세요.');
    }

    const cursor = req.query.cursor;
    if (!cursor || isNaN(cursor)) {
        throw new BadRequestError('검색의 커서값을 확인해주세요.');
    }

    next();
};

export { search_validate };
