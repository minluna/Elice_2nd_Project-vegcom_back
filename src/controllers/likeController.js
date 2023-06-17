import { likeService } from '../services/likeService.js';
import { statusCode } from '../utils/statusCode.js';

class likeController {
    static async showLike(req, res, next) {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const like = await likeService.showStatusLike({ userId, postId });

            statusCode.setResponseCode200(res);
            return res.send({ message: like.message, likecount: like.likeCount, likeuser: like.likeUser });
        } catch (error) {
            next(error);
        }
    }

    static async createLike(req, res, next) {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const like = await likeService.create({ userId, postId });

            statusCode.setResponseCode201(res);
            return res.send({ message: like.message });
        } catch (error) {
            next(error);
        }
    }

    static async deleteLike(req, res, next) {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const like = await likeService.delete({ userId, postId });

            statusCode.setResponseCode200(res);
            return res.send({ message: like.message });
        } catch (error) {
            next(error);
        }
    }
}

export { likeController };
