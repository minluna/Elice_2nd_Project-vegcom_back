import { mysqlDB, User, Search } from '../db/index.js';
import { UnauthorizedError, InternalServerError } from '../middlewares/errorMiddleware.js';

class searchService {
    static async getPost({ userId, keyword }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const searchPost = await Search.select({ keyword });

            await mysqlDB.query('COMMIT');

            return {
                statusCode: 200,
                message: '키워드를 포함한 게시물 불러오기에 성공했습니다.',
                searchPost,
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('키워드를 포함한 게시물 불러오기에 실패했습니다.');
            }
        }
    }
}

export { searchService };
