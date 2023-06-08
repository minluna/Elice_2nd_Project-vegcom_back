import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const searchValidationRules = [body('keyword').notEmpty().withMessage('검색 키워드를 입력하세요.')];

const search_validate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { searchValidationRules, search_validate };
