import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const SetUserValidationRules = [
    body('nickname').notEmpty().withMessage('이름을 입력하세요.'),
    body('description').notEmpty().withMessage('설명을 입력하세요.'),
];

const setUser_validate = (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        throw new BadRequestError('유저의 ID를 확인해주세요.');
    }

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
export { SetUserValidationRules, setUser_validate };
