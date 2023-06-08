import { likeService } from '../services/likeService.js';
import {UnauthorizedError, BadRequestError } from '../middlewares/errorMiddleware.js';

//post요청---> 생성하는 코드
//put요청 ---> 업데이트 해주는 코드 / 증가,삭제

// 해당 포스트의 좋아요 여부
class likeController {
    static async showLike (req, res, next) {
        const userId = req.currentUserId;
        const postId = req.body;
        
        if (!userId) {
            throw new UnauthorizedError('로그인한 유저만 사용할 수 있는 서비스입니다.');
        }
        
        if (!postId) {
            throw new BadRequestError('요청값을 확인해주세요.');
        }
        
        try {
            const like = await likeService.showStatusLike({ postId, userId });
            return res.status(like.statusCode).send({ message: like.message,  likecount:like.likeCount, likeuser:like.likeUser });
        } catch (error) {
            next(error);
        }
    }


    static async createLike (req, res, next) {
        const userId = req.currentUserId;
        const postId = req.body;
        
        if (!userId) {
            throw new UnauthorizedError('로그인란 유저만 사용할 수 있는 서비스입니다.');
        }
        
        if (!postId) {
            throw new BadRequestError('요청값을 확인해주세요.');
        }
        
        try {
            const like = await likeService.create({ userId, postId });
            return res.status(like.statusCode).send({ message: like.message });
        } catch (error) {
            next(error);
        }
    }

    static async deleteLike (req, res, next) {
        const userId = req.currentUserId;
        const postId = req.body;
        
        if (!userId) {
            throw new UnauthorizedError('로그인란 유저만 사용할 수 있는 서비스입니다.');
        }
        
        if (!postId) {
            throw new BadRequestError('요청값을 확인해주세요.');
        }
        
        try {
            const like = await likeService.delete({ userId, postId });
            return res.status(like.statusCode).send({ message: like.message });
        } catch (error) {
            next(error);
        }
    }

    // static async updateLike (req, res, next) {
    //     const userId = req.currentUserId;
    //     const postId = req.body;
        
    //     if (!userId) {
    //         throw new UnauthorizedError('로그인란 유저만 사용할 수 있는 서비스입니다.');
    //     }
        
    //     if (!postId) {
    //         throw new BadRequestError('요청값을 확인해주세요.');
    //     }
        
    //     try {
    //         const like = await likeService.countUpAndDown({ userId, postId });
    //         return res.status(like.statusCode).send({ message: like.message });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export { likeController }

