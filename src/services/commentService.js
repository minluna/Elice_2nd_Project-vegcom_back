import { mysqlDB, User, Comment, Post } from '../db/index.js';
import { UnauthorizedError, NotFoundError, InternalServerError } from '../middlewares/errorMiddleware.js';

class commentService {
    static async createComment({ userId, postId, content, parentId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            await Comment.create({ userId, postId, content, parentId });

            await mysqlDB.query('COMMIT');

            return {
                message: '댓글 추가하기에 성공했습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('댓글 추가하기에 실패했습니다.');
            }
        }
    }

    static async updateComment({ userId, postId, commentId, content }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const comment = await Comment.findById({ commentId });

            if (!comment) {
                throw new NotFoundError('요청한 댓글의 정보를 찾을 수 없습니다.');
            }

            await Comment.update({ postId, commentId, content });

            await mysqlDB.query('COMMIT');

            return {
                message: '댓글 수정하기에 성공하셨습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('댓글 수정하기에 실패했습니다.');
            }
        }
    }

    static async deleteComment({ userId, commentId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const comment = await Comment.findById({ commentId });

            if (!comment) {
                throw new NotFoundError('요청한 댓글의 정보를 찾을 수 없습니다.');
            }

            await Comment.delete({ commentId });

            await mysqlDB.query('COMMIT');

            return {
                message: '댓글 삭제하기에 성공하셨습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('댓글 삭제하기에 실패했습니다.');
            }
        }
    }

    static async getComment({ userId, postId, cursor }) {
        try {
            await mysqlDB.query('START TRANSACTION');
            let CommentList = [];
            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const post = await Post.findById({ postId });

            if (!post) {
                throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
            }

            if (cursor == 0) {
                CommentList = await Comment.zeroComment({ postId });
            } else {
                CommentList = await Comment.select({ postId, cursor });
            }

            // commentList가 없을 때 에러를 보내면...
            // 상세페이지 조회할 때.. 댓글이 없는 경우 에러가 발생하기 때문에
            // 그에 대한 에러처리는 없는게 나을거 같다.....?

            await mysqlDB.query('COMMIT');

            return {
                message: '게시글 총 댓글 불러오기에 성공하셨습니다.',
                CommentList,
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('게시글 총 댓글 불러오기에 실패했습니다.');
            }
        }
    }
}

export { commentService };
