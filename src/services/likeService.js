import { mysqlDB, User, Like } from '../db/index.js';
import { UnauthorizedError, InternalServerError, NotFoundError } from '../middlewares/errorMiddleware.js';

//수정작성 중
class likeService {
    //좋아요 여부 확인
    static async showStatusLike({ userId, postId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const likeUser = await Like.isLiked({ userId, postId });
            const likeCount = await Like.getLike({ postId });

            await mysqlDB.query('COMMIT');

            return {
                message: '좋아요 여부 확인 및 좋아요 누적수 불러오기에 성공했습니다.',
                likeUser,
                likeCount: likeCount.likeCount,
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('좋아요 여부 확인 및 좋아요 누적수 불러오기에 실패했습니다..');
            }
        }
    }

    //좋아요 생성
    static async create({ userId, postId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const likeUser = await Like.isLiked({ userId, postId });

            if (likeUser === true) {
                throw new NotFoundError('해당 게시물에는 이미 사용자의 좋아요가 있습니다.');
            }

            await Like.addLike({ userId, postId });

            await mysqlDB.query('COMMIT');

            return {
                message: '좋아요 목록 생성에 성공하셨습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('좋아요 목록 생성에 실패하였습니다.');
            }
        }
    }

    // 좋아요 삭제
    static async delete({ postId, userId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            await Like.removeLike({ userId, postId });

            await mysqlDB.query('COMMIT');

            return {
                message: '좋아요 목록 삭제에 성공하였습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('좋아요 목록 삭제에 실패하였습니다.');
            }
        }
    }
}

export { likeService };
