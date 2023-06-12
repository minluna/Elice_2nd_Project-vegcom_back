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

    static async getComment({ userId, postId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const post = await Post.findById({ postId });

            if (!post) {
                throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
            }

            const CommentList = await Comment.select({ postId });
            console.log(CommentList);
            await mysqlDB.query('COMMIT');

            return {
                message: '게시글 총 댓글 불러오기에 성공하셨습니다.',
                CommentListZero: CommentList[0],
                CommentListOther: CommentList[1],
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
