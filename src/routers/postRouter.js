import { Router } from 'express';
import { postController } from '../controllers/postController.js';

import { postParams_validate } from '../middlewares/postParams_validate.js';
import { addPostValidationRules, addPost_validate } from '../middlewares/addPost_validate.js';
import { setPostValidationRules, setPost_validate } from '../middlewares/setPost_validate.js';

import { upload } from '../aws.config.js';

const postRouter = Router();

// 1. 전체 피드 시간순
postRouter.get('/list', postController.getAllposts);

// 2. 피드 상세페이지
postRouter.get('/:postId', postParams_validate, postController.getPost);

// 3. 피드 작성
postRouter.post('/', upload.single('image'), addPostValidationRules, addPost_validate, postController.createPost);

// 4. 피드 수정
postRouter.put('/:postId', setPostValidationRules, setPost_validate, postController.setPost);

// 5. 피드 삭제
postRouter.delete('/:postId', postParams_validate, postController.delPost);

export { postRouter };
