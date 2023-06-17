import { mysqlDB, User, Rank } from '../db/index.js';
import { UnauthorizedError, InternalServerError } from '../middlewares/errorMiddleware.js';

class rankService {
    static async getRankList({ userId, point }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const rankList = await Rank.topTenRankList();

            await mysqlDB.query('COMMIT');

            return {
                message: 'Top10 랭킹 리스트 불러오기에 성공했습니다.',
                rankList,
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('Top10 랭킹 리스트 불러오기에 실패했습니다.');
            }
        }
    }
}

export { rankService };
