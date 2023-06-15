import { mysqlDB, User, Search } from '../db/index.js';
import { UnauthorizedError, InternalServerError } from '../middlewares/errorMiddleware.js';

class searchService {
    static async getPost({ userId, keyword, cursor }) {
        try {
            await mysqlDB.query('START TRANSACTION');
            let searchPost = [];

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            if (cursor == 0) {
                searchPost = await Search.select({ keyword });
            } else if (cursor == -1) {
                searchPost = '검색어가 포함된 게시물 조회가 끝났습니다.';
            } else {
                searchPost = await Search.selectKeyword({ keyword, cursor });
            }

            await mysqlDB.query('COMMIT');

            return {
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
