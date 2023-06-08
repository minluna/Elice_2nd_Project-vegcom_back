import { likeService } from '../services/likeService.js';

class likeController {
    static async showLike(req, res, next) {
        const userId = req.currentUserId;
        const postId = req.params.postId;

        try {
            const like = await likeService.showStatusLike({ userId, postId });
            return res
                .status(like.statusCode)
                .send({ message: like.message, likecount: like.likeCount, likeuser: like.likeUser });
        } catch (error) {
            next(error);
        }
    }

    static async createLike(req, res, next) {
        const userId = req.currentUserId;
        const postId = req.params.postId;

        try {
            const like = await likeService.create({ userId, postId });
            return res.status(like.statusCode).send({ message: like.message });
        } catch (error) {
            next(error);
        }
    }

    static async deleteLike(req, res, next) {
        const userId = req.currentUserId;
        const postId = req.params.postId;

        try {
            const like = await likeService.delete({ userId, postId });
            return res.status(like.statusCode).send({ message: like.message });
        } catch (error) {
            next(error);
        }
    }
}

export { likeController };
