import { Router } from 'express';
import { commentController } from '../controllers/commentController.js';

import { addCommentValidationRules, addComment_validate } from '../middlewares/addComment_validate.js';
import { setCommentValidationRules, setComment_validate } from '../middlewares/setComment_validate.js';
import { commentParams_validate } from '../middlewares/commentParams_validate.js';
import { getComment_validate } from '../middlewares/getComment_validate.js';

const commentRouter = Router();

// 댓글 작성하기
commentRouter.post('/', addCommentValidationRules, addComment_validate, commentController.create);

// 댓글 수정하기
commentRouter.put('/:commentId', setCommentValidationRules, setComment_validate, commentController.update);

// 댓글 삭제하기
commentRouter.delete('/:commentId', commentParams_validate, commentController.delete);

// 게시물에 해당하는 댓글 불러오기
commentRouter.get('/', getComment_validate, commentController.getComment);

export { commentRouter };
