import { likeService } from '../services/likeService.js';
import errors from '../../errors.js';

//post요청---> 생성하는 코드
//put요청 ---> 업데이트 해주는 코드 / 증가,삭제

// 해당 포스트의 총 좋아요
async function getAllLike (req, res, next) {
    try {
        const postId = req.body;
        const like = await likeService.findLike({ postId });
        
        res.status(200).send(like);
    
    } catch (error) {
        next(error);
    }
}

async function createLike (req, res, next) {
    try {
        const userId = req.currentUserId;
        const postId = req.body;
        const like = await likeService.countUp({userId, postId });

        res.status(200).send(like);
    
    } catch (error) {
        next(error);
    }
}

async function deleteLike (req, res, next) {
    try {
        const userId = req.currentUserId;
        const postId = req.body;
        const like = await likeService.countDown({userId, postId });
        
        res.status(200).send(like);
    
    } catch (error) {
        next(error);
    }
}

    //이거 어뜨케 나누지???
async function updateLike(req, res, next) {
    try {
        const userId = req.currentUserId;
        const postId = req.body;
        //여기 수정필요.
        const like = await likeService.findLike({userId, postId });
            
        res.status(200).send(like);
        
    } catch (error) {            
        next(error);
    }
}

export {getAllLike, createLike, deleteLike, updateLike}
