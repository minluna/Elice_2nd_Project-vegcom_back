import { User, Post, Like, mysqlDB } from '../db/index.js';
import { UnauthorizedError, NotFoundError, InternalServerError } from '../middlewares/errorMiddleware.js';
//모델과 서비스를 어떻게 구성할까?
//좋아요는 한 게시물 당 한번만 가능
//좋아요 선택시 체크가 안되어 있으면 체크하고, 이미 되어 잇으면 해지
// 좋아요가 되어있는지 안되어있는지 확인하는 코드 필요 ---> 좋아요 테이블에서 찾아봄 (currentuserid = userid)
// 좋아요테이블에  있으면 ---> 삭제하기
// 좋아요가 되어 있지 않으면 ---> 생성하기 

//수정작성 중
class likeService {

    //좋아요 여부 확인
    static async showStatusLike({postId, userId}) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 토큰입니다.');
            }

            const likeUser = await Like.isLiked({postId, userId});
            const likeCount = await Like.getLike({postId});

            await mysqlDB.query('COMMIT');

            return {
                statusCode: 200,
                message: '좋아요 여부 확인 및 좋아요 누적수 확인.',
                likeCount,
                likeUser
            };

        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError ('좋아요 여부 확인 및 좋아요 누적수 확인에 실패하였습니다.');
            }
        }
    }

    //좋아요 생성
    static async create({postId, userId}) {
        
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 토큰입니다.');
            }

            await Like.create({postId, userId});
        

            await mysqlDB.query('COMMIT');

            return {
                statusCode: 200,
                message: '좋아요 목록 생성에 성공하셨습니다.',
            };

        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError ('좋아요 목록 생성에 실패하였습니다.');
            }
        }
    }
    // 좋아요 삭제
    static async delete({postId, userId}) {
        
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 토큰입니다.');
            }

            
            await Like.delete({postId, userId});

            await mysqlDB.query('COMMIT');

            return {
                statusCode: 200,
                message: '좋아요 목록 삭제에 성공하였습니다.',
            };

        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError ('좋아요 목록 삭제에 실패하였습니다.');
            }
        }
    }

    // //좋아요 횟수 증가
    // static async countUpAndDown({postId, userId}) {
    //     try {
    //         await mysqlDB.query('START TRANSACTION');

    //         const user = await User.findById({ userId });

    //         if (!user) {
    //             throw new UnauthorizedError('잘못된 토큰입니다.');
    //         }

    //         likecount = await Like.getLike({postId, userId});
        

    //         await mysqlDB.query('COMMIT');

    //         return {
    //             statusCode: 200,
    //             message: '좋아요 카운트에 성공하였습니다.',
    //             likecount
    //         };

    //     } catch (error) {
    //         await mysqlDB.query('ROLLBACK');

    //         if (error instanceof UnauthorizedError) {
    //             throw error;
    //         } else {
    //             throw new InternalServerError ('좋아요 카운트에 실패하였습니다.');
    //         }
    //     }
    // }
}

export { likeService };

   

