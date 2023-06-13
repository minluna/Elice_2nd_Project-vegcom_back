import { commentService } from '../services/commentService.js';
import { statusCode } from '../utils/statusCode.js';

class commentController {
    static async create(req, res, next) {
        try {
            const userId = req.currentUserId;
            const { postId, content, parentId } = req.body;

            const createComment = await commentService.createComment({ userId, postId, content, parentId });

            statusCode.setResponseCode201(res);
            return res.send({ message: createComment.message });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const userId = req.currentUserId;
            const commentId = req.params.commentId;
            const { postId, content } = req.body;

            const updateComment = await commentService.updateComment({ userId, postId, commentId, content });

            statusCode.setResponseCode200(res);
            return res.send({ message: updateComment.message });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const userId = req.currentUserId;
            const commentId = req.params.commentId;

            const deleteComment = await commentService.deleteComment({ userId, commentId });

            statusCode.setResponseCode200(res);
            return res.send({ message: deleteComment.message });
        } catch (error) {
            next(error);
        }
    }

    static async getComment(req, res, next) {
        try {
            const userId = req.currentUserId;
            const postId = req.query.postId;
            const cursor = req.query.cursor;

            const getComment = await commentService.getComment({ userId, postId, cursor });

            statusCode.setResponseCode200(res);
            return res.send({
                message: getComment.message,
                commentListZero: getComment.CommentListZero,
                commentListOther: getComment.CommentListOther,
            });
        } catch (error) {
            next(error);
        }
    }
}

export { commentController };
