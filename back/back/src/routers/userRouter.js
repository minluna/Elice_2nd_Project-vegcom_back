import { Router } from 'express';
import { login_required } from '../middlewares/login_required.js';
import { userAuthController } from '../controllers/userController.js';

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/register', userAuthController.register);

// 로그인
userAuthRouter.post('/login', userAuthController.login);

// 로그인 검증
userAuthRouter.get('/isLogin', login_required, userAuthController.isLogin);

// 유저 실적 보여주기
userAuthRouter.get('/point', login_required, userAuthController.getPoint);

//전체 유저 수 불러오기
userAuthRouter.get('/userCount', login_required, userAuthController.getCount);

// 유저 정보 불러오기
userAuthRouter.get('/:userId', login_required, userAuthController.getInfo);

// 유저 정보 수정하기(별명, 설명)
userAuthRouter.put('/:userId', login_required, userAuthController.setInfo);

// 유저 정보 삭제하기
userAuthRouter.delete('/:userId', login_required, userAuthController.delInfo);

//전체 유저 수 전달
userAuthRouter.get('/:userCount', async function (req, res, next) {
    try {
        const userCount= await userAuthService.getUserCount();

        if (createUser.errorMessage) {
            res.status(400).send({ error: userCount.errorMessage });
            throw new Error(userCount.errorMessage);
        }

        res.status(200).send(userCount);
    } catch (error) {
        next(error);
    }
});

export { userAuthRouter };
