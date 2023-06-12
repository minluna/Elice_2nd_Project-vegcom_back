import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const getCommentValidationRules = [
    body('cursor')
        .notEmpty()
        .withMessage('댓글의 Cursor값을 확인해주세요.')
        .custom(value => value >= 0)
        .withMessage('댓글의 Cursor 값이 유효하지 않습니다.'),
];

const getComment_validate = (req, res, next) => {
    const postId = req.params.postId;
    if (!postId || isNaN(postId)) {
        throw new BadRequestError('게시물의 ID를 확인해주세요.');
    }

    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { getCommentValidationRules, getComment_validate };
