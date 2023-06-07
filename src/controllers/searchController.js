import { searchService } from '../services/searchService.js';
import { UnauthorizedError, BadRequestError } from '../../errors.js';

class searchController {
    static async getKeywordPost(req, res, next) {
        const userId = req.currentUserId;
        const { keyword } = req.body;

        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        if (!keyword) {
            throw new BadRequestError('BadRequestError', '요청값을 확인해주세요.');
        }

        try {
            const keywordPost = await searchService.getPost({ userId, keyword });
            return res.status(keywordPost.statusCode).send({ message: keywordPost.message, searchPost: keywordPost.searchPost });
        } catch (error) {
            next(error);
        }
    }
}

export { searchController };
