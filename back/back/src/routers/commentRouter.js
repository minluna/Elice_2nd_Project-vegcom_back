import { Router } from 'express';
import { commentController } from '../controllers/commentController.js';

const commentRouter = Router();

// 댓글 작성하기
commentRouter.post('/', commentController.create);

// 댓글 수정하기
commentRouter.put('/:commentId', commentController.update);

// 댓글 삭제하기
commentRouter.delete('/:commentId', commentController.delete);

// 게시물에 해당하는 댓글 불러오기
commentRouter.get('/:postId', commentController.getComment);

export { commentRouter };
