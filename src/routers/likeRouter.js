import { Router } from 'express';
import { likeController } from '../controllers/likeController.js';

const likeRouter = Router();

// 전체 좋아요 개수
likeRouter.get("/:postId", likeController.showLike) 

//좋아요 목록 생성
likeRouter.post("/:postId", likeController.createLike)

//좋아요 목록 삭제
likeRouter.delete("/:postId", likeController.deleteLike) 

// //좋아요 수 증가/감소   
// likeRouter.put("/:postId", likeController.updateLike) 

export { likeRouter };
