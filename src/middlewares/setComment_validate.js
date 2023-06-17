import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const setCommentValidationRules = [
    body('postId').notEmpty().withMessage('게시물 ID를 확인해주세요.'),
    body('content')
        .notEmpty()
        .withMessage('게시물 내용을 입력하세요.')
        .isLength({ max: 200 })
        .withMessage('게시물 내용은 최대 200글자까지 허용됩니다.'),
];

const setComment_validate = (req, res, next) => {
    const commentId = req.params.commentId;
    if (!commentId || isNaN(commentId)) {
        throw new BadRequestError('댓글의 ID를 확인해주세요.');
    }

    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { setCommentValidationRules, setComment_validate };
