import { searchService } from '../services/searchService.js';
import { UnauthorizedError, BadRequestError } from '../middlewares/errorMiddleware.js';

class searchController {
    static async getKeywordPost(req, res, next) {
        const userId = req.currentUserId;
        const { keyword } = req.body;

        try {
            const keywordPost = await searchService.getPost({ userId, keyword });
            return res.status(keywordPost.statusCode).send({ message: keywordPost.message, searchPost: keywordPost.searchPost });
        } catch (error) {
            next(error);
        }
    }
}

export { searchController };
