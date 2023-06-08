import { rankService } from '../services/rankService.js';

class rankController {
    static async rankList(req, res, next) {
        const userId = req.currentUserId;

        try {
            const getRank = await rankService.getRankList({ userId });
            return res.status(getRank.statusCode).send({ message: getRank.message, rankList: getRank.rankList });
        } catch (error) {
            next(error);
        }
    }
}

export { rankController };
