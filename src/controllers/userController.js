import { userAuthService } from '../services/userService.js';

class userAuthController {
    static async register(req, res, next) {
        try {
            const { email, password, nickname, imageUrl } = req.body;

            const createUser = await userAuthService.createUser({ email, password, nickname, imageUrl });
            return res.status(createUser.statusCode).send(createUser.message);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const loginUser = await userAuthService.getUser({ email, password });
            return res
                .status(loginUser.statusCode)
                .send({ message: loginUser.message, token: loginUser.token, userId: loginUser.userId });
        } catch (error) {
            next(error);
        }
    }

    static async isLogin(req, res, next) {
        try {
            const userId = req.currentUserId;

            const checkUser = await userAuthService.loginCheck({ userId });
            return res.status(checkUser.statusCode).send({
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
            return res.status(getPoint.statusCode).send({ message: getPoint.message, userPoint: getPoint.userPoint });
        } catch (error) {
            next(error);
        }
    }

    static async getCount(req, res, next) {
        try {
            const userId = req.currentUserId;

            const getCount = await userAuthService.getUserCount({ userId });
            return res.status(getCount.statusCode).send({ message: getCount.message, userCount: getCount.userCount });
        } catch (error) {
            next(error);
        }
    }

    static async getInfo(req, res, next) {
        try {
            const userId = req.params.userId;

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
            const imageUrl = req.file.key;

            const toUpdate = { nickname, description };

            const setInfo = await userAuthService.setUserInfo({ userId, toUpdate, imageUrl });
            return res.status(setInfo.statusCode).send({ message: setInfo.message });
        } catch (error) {
            next(error);
        }
    }

    static async delInfo(req, res, next) {
        try {
            const userId = req.params.userId;

            const delInfo = await userAuthService.delUserInfo({ userId });
            return res.status(delInfo.statusCode).send({ message: delInfo.message });
        } catch (error) {
            next(error);
        }
    }
}

export { userAuthController };
