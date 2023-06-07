import { commentService } from '../services/commentService.js';
import { UnauthorizedError, BadRequestError } from '../../errors.js';

class commentController {
    static async create(req, res, next) {
        const userId = req.currentUserId;
        const { postId, content } = req.body;
        const parentId = req.body.parentId ?? 0;

        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        if (!postId || !content || !parentId) {
            throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
        }

        try {
            const createComment = await commentService.createComment({ userId, postId, content, parentId });
            return res.status(createComment.statusCode).send({ message: createComment.message });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        const userId = req.currentUserId;
        const commentId = req.params.commentId;
        const { postId, content } = req.body;

        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        if (!commentId || !postId || !content) {
            throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
        }

        try {
            const updateComment = await commentService.updateComment({ userId, postId, commentId, content });
            return res.status(updateComment.statusCode).send({ message: updateComment.message });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        const userId = req.currentUserId;
        const commentId = req.params.commentId;

        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        if (!commentId) {
            throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
        }

        try {
            const deleteComment = await commentService.deleteComment({ userId, commentId });
            return res.status(deleteComment.statusCode).send({ message: deleteComment.message });
        } catch (error) {
            next(error);
        }
    }

    static async getComment(req, res, next) {
        const userId = req.currentUserId;
        const postId = req.params.postId;

        if (!userId) {
            throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
        }

        if (!postId) {
            throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
        }

        try {
            const getComment = await commentService.getComment({ userId, postId });
            return res.status(getComment.statusCode).send({ message: getComment.message, CommentList: getComment.CommentList });
        } catch (error) {
            next(error);
        }
    }
}

export { commentController };
