import { User, Rank } from '../db/index.js';
// import errors from '../../errors.js';

class rankService {
    static async getRankList({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        try {
            const rankList = await Rank.getRankList();

            return {
                statusCode: 200,
                message: '전체 랭킹 리스트 불러오기에 성공했습니다.',
                rankList,
            };
        } catch (error) {
            throw InternalServerError('RankLoadFailedError', '전체 랭킹 리스트 불러오기에 실패했습니다.');
        }
    }
}

export { rankService };
