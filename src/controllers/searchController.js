import { searchService } from '../services/searchService.js';
import { statusCode } from '../utils/statusCode.js';

class searchController {
    static async getKeywordPost(req, res, next) {
        try {
            const userId = req.currentUserId;

            const keyword = req.query.keyword;
            const cursor = req.query.cursor;

            const keywordPost = await searchService.getPost({ userId, keyword, cursor });

            statusCode.setResponseCode200(res);
            return res.send({ message: keywordPost.message, searchPost: keywordPost.searchPost });
        } catch (error) {
            next(error);
        }
    }
}

export { searchController };
