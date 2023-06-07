import { User, Comment } from '../db/index.js';
import { UnauthorizedError, NotFoundError, InternalServerError } from '../../errors.js';

class commentService {
    static async createComment({ userId, postId, content, parentId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        try {
            await Comment.create({ userId, postId, content, parentId });

            return {
                statusCode: 200,
                message: '댓글 추가하기에 성공했습니다.',
            };
        } catch (error) {
            throw InternalServerError('CommentCreateFailedError', '댓글 추가하기에 실패했습니다.');
        }
    }

    static async updateComment({ userId, postId, commentId, content }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        const comment = await Comment.findById({ commentId });

        if (!comment) {
            throw NotFoundError('CommentNotFoundId', '요청한 댓글의 정보를 찾을 수 없습니다.');
        }

        try {
            await Comment.update({ postId, commentId, content });

            return {
                statusCode: 200,
                message: '댓글 수정하기에 성공하셨습니다.',
            };
        } catch (error) {
            throw InternalServerError('CommentUpdateFailedError', '댓글 수정하기에 실패했습니다.');
        }
    }

    static async deleteComment({ userId, commentId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        const comment = await Comment.findById({ commentId });

        if (!comment) {
            throw NotFoundError('CommentNotFoundId', '요청한 댓글의 정보를 찾을 수 없습니다.');
        }
        try {
            await Comment.delete({ commentId });

            return {
                statusCode: 200,
                message: '댓글 삭제하기에 성공하셨습니다.',
            };
        } catch (error) {
            throw InternalServerError('CommentDeleteFailedError', '댓글 삭제하기에 실패했습니다.');
        }
    }

    static async getComment({ userId, postId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        // post 기능 합칠 시 주석 해제
        // const post = await Post.findById({ postId });

        // if (!post) {
        //     throw NotFoundError('PostNotFoundId', '요청한 게시물의 정보를 찾을 수 없습니다.');
        // }

        try {
            const CommentList = await Comment.select({ postId });

            return {
                statusCode: 200,
                message: '게시글 총 댓글 불러오기에 성공하셨습니다.',
                CommentList,
            };
        } catch (error) {
            throw InternalServerError('PostCommentsLoadFailedError', '게시글 총 댓글 불러오기에 실패했습니다.');
        }
    }
}

export { commentService };
