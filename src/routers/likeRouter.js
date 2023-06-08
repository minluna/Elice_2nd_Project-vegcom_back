import { Router } from 'express';
import { likeController } from '../controllers/likeController.js';

import { postParams_validate } from '../middlewares/postParams_validate.js';

const likeRouter = Router();

// 전체 좋아요 개수
likeRouter.get('/:postId', postParams_validate, likeController.showLike);

//좋아요 목록 생성
likeRouter.post('/:postId', postParams_validate, likeController.createLike);

//좋아요 목록 삭제
likeRouter.delete('/:postId', postParams_validate, likeController.deleteLike);

export { likeRouter };
