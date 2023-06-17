import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const RegisterValidationRules = [
    body('email').notEmpty().withMessage('이메일을 입력하세요.').isEmail().withMessage('유효한 이메일을 입력하세요.'),
    body('password')
        .notEmpty()
        .withMessage('비밀번호를 입력하세요.')
        .isLength({ min: 10 })
        .withMessage('비밀번호는 최소 10글자이상 입력하세요.'),
    body('nickname').notEmpty().withMessage('이름을 입력하세요.'),
    body('imageUrl').notEmpty().withMessage('imageUrl을 확인하세요.'),
];

const register_validate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { RegisterValidationRules, register_validate };
