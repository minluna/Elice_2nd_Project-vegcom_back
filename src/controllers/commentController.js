import { commentService } from '../services/commentService.js';

class commentController {
    static async create(req, res, next) {
        try {
            const userId = req.currentUserId;
            const { postId, content, parentId } = req.body;

            const createComment = await commentService.createComment({ userId, postId, content, parentId });
            return res.status(createComment.statusCode).send({ message: createComment.message });
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
            return res.status(updateComment.statusCode).send({ message: updateComment.message });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const userId = req.currentUserId;
            const commentId = req.params.commentId;

            const deleteComment = await commentService.deleteComment({ userId, commentId });
            return res.status(deleteComment.statusCode).send({ message: deleteComment.message });
        } catch (error) {
            next(error);
        }
    }

    static async getComment(req, res, next) {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const getComment = await commentService.getComment({ userId, postId });
            return res.status(getComment.statusCode).send({ message: getComment.message, commentList: getComment.CommentList });
        } catch (error) {
            next(error);
        }
    }
}

export { commentController };
