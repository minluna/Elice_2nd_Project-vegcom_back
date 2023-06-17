import { userAuthService } from '../services/userService.js';
import { statusCode } from '../utils/statusCode.js';

class userAuthController {
    static async register(req, res, next) {
        try {
            const { email, password, nickname, imageUrl } = req.body;

            const createUser = await userAuthService.createUser({ email, password, nickname, imageUrl });

            statusCode.setResponseCode201(res);
            return res.send(createUser.message);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const loginUser = await userAuthService.getUser({ email, password });

            statusCode.setResponseCode200(res);

            return res.send({ message: loginUser.message, token: loginUser.token, userId: loginUser.userId });
        } catch (error) {
            next(error);
        }
    }

    static async isLogin(req, res, next) {
        try {
            const userId = req.currentUserId;

            const checkUser = await userAuthService.loginCheck({ userId });

            statusCode.setResponseCode200(res);
            return res.send({
                message: checkUser.message,
                userId: checkUser.userId,
                email: checkUser.email,
                nickname: checkUser.nickname,
                userImage: checkUser.userImage,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getPoint(req, res, next) {
        try {
            const userId = req.currentUserId;

            const getPoint = await userAuthService.getUserPoint({ userId });

            statusCode.setResponseCode200(res);
            return res.send({ message: getPoint.message, userPoint: getPoint.userPoint });
        } catch (error) {
            next(error);
        }
    }

    static async getCount(req, res, next) {
        try {
            const userId = req.currentUserId;

            const getCount = await userAuthService.getUserCount({ userId });

            statusCode.setResponseCode200(res);
            return res.send({ message: getCount.message, userCount: getCount.userCount });
        } catch (error) {
            next(error);
        }
    }

    static async getInfo(req, res, next) {
        try {
            const userId = req.params.userId;

            const getInfo = await userAuthService.getUserInfo({ userId });

            statusCode.setResponseCode200(res);
            return res.send({ message: getInfo.message, userInfo: getInfo.userInfo });
        } catch (error) {
            next(error);
        }
    }

    static async setInfo(req, res, next) {
        try {
            const userId = req.params.userId;
            const { nickname, description } = req.body;
            const imageUrl = req.file.key;

            const toUpdate = { nickname, description };

            const setInfo = await userAuthService.setUserInfo({ userId, toUpdate, imageUrl });

            statusCode.setResponseCode200(res);
            return res.send({ message: setInfo.message });
        } catch (error) {
            next(error);
        }
    }

    static async delInfo(req, res, next) {
        try {
            const userId = req.params.userId;

            const delInfo = await userAuthService.delUserInfo({ userId });

            statusCode.setResponseCode200(res);
            return res.send({ message: delInfo.message });
        } catch (error) {
            next(error);
        }
    }
}

export { userAuthController };
