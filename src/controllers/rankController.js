import { rankService } from '../services/rankService.js';
import { statusCode } from '../utils/statusCode.js';

class rankController {
    static async rankList(req, res, next) {
        try {
            const userId = req.currentUserId;
            const point = req.params.point;
            const date = req.params.date;

            const getRank = await rankService.getRankList({ userId, point, date });

            statusCode.setResponseCode200(res);
            return res.send({ message: getRank.message, rankList: getRank.rankList });
        } catch (error) {
            next(error);
        }
    }
}

export { rankController };
