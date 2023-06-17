import { Router } from 'express';
import { userAuthController } from '../controllers/userController.js';

import { login_required } from '../middlewares/login_required.js';
import { loginValidationRules, login_validate } from '../middlewares/login_validate.js';
import { RegisterValidationRules, register_validate } from '../middlewares/register_validate.js';
import { userParams_validate } from '../middlewares/userParams_validate.js';
import { SetUserValidationRules, setUser_validate } from '../middlewares/setUser_validate.js';

import { upload } from '../aws.config.js';

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/register', RegisterValidationRules, register_validate, userAuthController.register);

// 로그인
userAuthRouter.post('/login', loginValidationRules, login_validate, userAuthController.login);

// 로그인 검증
userAuthRouter.get('/isLogin', login_required, userAuthController.isLogin);

// 유저 실적 보여주기
userAuthRouter.get('/point', login_required, userAuthController.getPoint);

//전체 유저 수 불러오기
userAuthRouter.get('/userCount', login_required, userAuthController.getCount);

// 유저 정보 불러오기
userAuthRouter.get('/:userId', login_required, userParams_validate, userAuthController.getInfo);

// 유저 정보 수정하기(별명, 설명)
userAuthRouter.put(
    '/:userId',
    login_required,
    upload.single('image'),
    SetUserValidationRules,
    setUser_validate,
    userAuthController.setInfo,
);

// 유저 정보 삭제하기
userAuthRouter.delete('/:userId', login_required, userParams_validate, userAuthController.delInfo);

export { userAuthRouter };
