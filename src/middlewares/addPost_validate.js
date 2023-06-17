import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const addPostValidationRules = [
    body('content')
        .notEmpty()
        .withMessage('게시물 내용을 입력하세요.')
        .isLength({ max: 200 })
        .withMessage('게시물 내용은 최대 200글자까지 허용됩니다.'),
];

const addPost_validate = (req, res, next) => {
    const imageUrl = req.file;

    if (!imageUrl) {
        throw new BadRequestError('imageUrl을 확인해주세요.');
    }

    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { addPostValidationRules, addPost_validate };
