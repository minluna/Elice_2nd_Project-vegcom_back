import { rankService } from '../services/rankService.js';
import { statusCode } from '../utils/statusCode.js';

class rankController {
    static async rankList(req, res, next) {
        try {
            const userId = req.currentUserId;
            const cursor = req.params.cursor;

            const getRank = await rankService.getRankList({ userId, cursor });

            statusCode.setResponseCode200(res);
            return res.send({ message: getRank.message, rankList: getRank.rankList });
        } catch (error) {
            next(error);
        }
    }
}

export { rankController };
