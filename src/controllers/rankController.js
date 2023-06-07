import { rankService } from '../services/rankService.js';
// import errors from '../../errors.js';

class rankController {
    static async rankList(req, res, next) {
        const userId = req.currentUserId;

        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        try {
            const getRank = await rankService.getRankList({ userId });
            return res.status(getRank.statusCode).send({ message: getRank.message, rankList: getRank.rankList });
        } catch (error) {
            next(error);
        }
    }
}

export { rankController };
