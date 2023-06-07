import { Router } from 'express';
import { getAllposts, getPost, createPost, setPost, delPost } from '../controllers/postController.js';

const postRouter = Router();

// 1. 전체 피드 시간순
postRouter.get('/list', getAllposts);

// 2. 피드 상세페이지
postRouter.get('/:postId', getPost);

// 3. 피드 작성
postRouter.post('/', createPost);

// 4. 피드 수정
postRouter.put('/:postId', setPost);

// 5. 피드 삭제
postRouter.delete('/:postId', delPost);

export { postRouter };
