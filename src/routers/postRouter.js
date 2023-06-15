import { Router } from 'express';
import { postController } from '../controllers/postController.js';

import { postParams_validate } from '../middlewares/postParams_validate.js';
import { addPostValidationRules, addPost_validate } from '../middlewares/addPost_validate.js';
import { setPostValidationRules, setPost_validate } from '../middlewares/setPost_validate.js';
import { userParams_validate } from '../middlewares/userParams_validate.js';
import { getPost_validate } from '../middlewares/getPost_vaildate.js';

import { upload } from '../aws.config.js';

const postRouter = Router();

// 1. 전체 피드 시간순
postRouter.get('/list/:cursor', getPost_validate, postController.getAllposts);

// 6. 피드 개수와 피드 작성자의 수
postRouter.get('/count', postController.getCount);

// 7. 특정 유저의 피드 불러오기
postRouter.get('/mypage/:userId', userParams_validate, postController.getUserPost);

// 8. 특정 유저가 좋아요 한 피드 불러오기
postRouter.get('/like/:userId', userParams_validate, postController.getUserLikePost);

// 2. 피드 상세페이지
postRouter.get('/:postId', postParams_validate, postController.getPost);

// 3. 피드 작성
postRouter.post('/', upload.single('image'), addPostValidationRules, addPost_validate, postController.createPost);

// 4. 피드 수정
postRouter.put('/:postId', upload.single('image'), setPostValidationRules, setPost_validate, postController.setPost);

// 5. 피드 삭제
postRouter.delete('/:postId', postParams_validate, postController.delPost);

export { postRouter };
