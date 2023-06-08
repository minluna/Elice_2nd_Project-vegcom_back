import { searchService } from '../services/searchService.js';

class searchController {
    static async getKeywordPost(req, res, next) {
        try {
            const userId = req.currentUserId;
            const { keyword } = req.body;

            const keywordPost = await searchService.getPost({ userId, keyword });
            return res.status(keywordPost.statusCode).send({ message: keywordPost.message, searchPost: keywordPost.searchPost });
        } catch (error) {
            next(error);
        }
    }
}

export { searchController };
