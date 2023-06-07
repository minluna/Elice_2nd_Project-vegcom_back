import { userAuthService } from '../services/userService.js';
import { BadRequestError, UnauthorizedError } from '../../errors.js';

class userAuthController {
    static async register(req, res, next) {
        try {
            const { email, password, nickname } = req.body;

            if (!email || !password || !nickname) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const createUser = await userAuthService.createUser({ email, password, nickname });
            return res.status(createUser.statusCode).send(createUser.message);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const loginUser = await userAuthService.getUser({ email, password });
            return res.status(loginUser.statusCode).send({ message: loginUser.message, token: loginUser.token });
        } catch (error) {
            next(error);
        }
    }

    static async isLogin(req, res, next) {
        const userId = req.currentUserId;
        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        try {
            const checkUser = await userAuthService.loginCheck({ userId });
            return res.status(checkUser.statusCode).send({ message: checkUser.message });
        } catch (error) {
            next(error);
        }
    }

    static async getPoint(req, res, next) {
        const userId = req.currentUserId;

        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        try {
            const getPoint = await userAuthService.getUserPoint({ userId });
            return res.status(getPoint.statusCode).send({ message: getPoint.message, userPoint: getPoint.userPoint });
        } catch (error) {
            next(error);
        }
    }

    static async getCount(req, res, next) {
        const userId = req.currentUserId;

        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        try {
            const getCount = await userAuthService.getUserCount({ userId });
            return res.status(getCount.statusCode).send({ message: getCount.message, userCount: getCount.userCount });
        } catch (error) {
            next(error);
        }
    }

    static async getInfo(req, res, next) {
        try {
            const userId = req.params.userId;

            if (!userId) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const getInfo = await userAuthService.getUserInfo({ userId });
            return res.status(getInfo.statusCode).send({ message: getInfo.message, userInfo: getInfo.userInfo });
        } catch (error) {
            next(error);
        }
    }

    static async setInfo(req, res, next) {
        try {
            const userId = req.params.userId;
            const { nickname, description } = req.body;

            if (!userId || !nickname || !description) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const toUpdate = { nickname, description };

            const setInfo = await userAuthService.setUserInfo({ userId, toUpdate });
            return res.status(setInfo.statusCode).send({ message: setInfo.message });
        } catch (error) {
            next(error);
        }
    }

    static async delInfo(req, res, next) {
        try {
            const userId = req.params.userId;

            if (!userId) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const delInfo = await userAuthService.delUserInfo({ userId });
            return res.status(delInfo.statusCode).send({ message: delInfo.message });
        } catch (error) {
            next(error);
        }
    }
}

export { userAuthController };
