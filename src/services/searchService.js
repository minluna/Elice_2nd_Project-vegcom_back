import { User, Search } from '../db/index.js';
import { UnauthorizedError, InternalServerError } from '../middlewares/errorMiddleware.js';

class searchService {
    static async getPost({ userId, keyword }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
        }

        try {
            const searchPost = await Search.select({ keyword });

            return {
                statusCode: 200,
                message: '키워드를 포함한 게시물 불러오기에 성공했습니다.',
                searchPost,
            };
        } catch (error) {
            throw new InternalServerError('키워드를 포함한 게시물 불러오기에 실패했습니다.');
        }
    }
}

export { searchService };
