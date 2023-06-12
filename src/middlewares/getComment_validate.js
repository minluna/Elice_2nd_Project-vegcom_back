import { BadRequestError } from './errorMiddleware.js';

const getComment_validate = (req, res, next) => {
    const postId = req.params.postId;
    const cursor = req.params.cursor;

    if (!postId || isNaN(postId)) {
        throw new BadRequestError('게시물의 ID를 확인해주세요.');
    }

    if (!cursor || isNaN(cursor) || cursor < 0) {
        throw new BadRequestError('댓글의 cursor값을 확인해주세요.');
    }

    next();
};

export { getComment_validate };
