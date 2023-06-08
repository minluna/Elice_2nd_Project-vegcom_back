import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const addCommentValidationRules = [
    body('postId').notEmpty().withMessage('게시물 ID를 확인해주세요.'),
    body('content')
        .notEmpty()
        .withMessage('게시물 내용을 입력하세요.')
        .isLength({ max: 200 })
        .withMessage('게시물 내용은 최대 200글자까지 허용됩니다.'),
    body('parentId').notEmpty().withMessage('게시물 부모 ID를 확인해주세요.'),
];

const addComment_validate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { addCommentValidationRules, addComment_validate };
