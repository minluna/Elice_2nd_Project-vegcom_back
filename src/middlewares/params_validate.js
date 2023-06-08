import { BadRequestError } from './errorMiddleware.js';

const params_validate = (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        throw new BadRequestError('유저의 ID를 확인해주세요.');
    }

    next();
};

export { params_validate };
