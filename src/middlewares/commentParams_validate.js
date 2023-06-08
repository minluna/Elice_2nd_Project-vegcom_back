import { BadRequestError } from './errorMiddleware.js';

const commentParams_validate = (req, res, next) => {
    const commentId = req.params.commentId;
    if (!commentId || isNaN(commentId)) {
        throw new BadRequestError('댓글의 ID를 확인해주세요.');
    }

    next();
};

export { commentParams_validate };
