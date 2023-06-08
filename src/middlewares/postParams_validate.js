import { BadRequestError } from './errorMiddleware.js';

const postParams_validate = (req, res, next) => {
    const postId = req.params.postId;
    if (!postId || isNaN(postId)) {
        throw new BadRequestError('게시물의 ID를 확인해주세요.');
    }

    next();
};

export { postParams_validate };
