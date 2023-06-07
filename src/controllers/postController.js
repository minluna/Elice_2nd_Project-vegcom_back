import { postService } from '../services/postService.js';
import { BadRequestError, UnauthorizedError } from '../../errors.js';

class postController {
    // 1. 전체 피드 시간순
    static async getAllposts(req, res, next) {
        try {
            const userId = req.currentUserId;

            if (!userId) {
                throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
            }

            const posts = await postService.getAllPosts({ userId });
            res.status(posts.statusCode).send({ message: posts.message, postList: posts.posts });
        } catch (error) {
            next(error);
        }
    }

    // 2. 피드 상세페이지
    static async getPost(req, res, next) {
        try {
            const userId = req.currentUserId;

            if (!userId) {
                throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
            }

            const postId = req.params.postId;

            if (!postId) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const post = await postService.getPost({ userId, postId });
            res.status(post.statusCode).send({ message: post.message, post: post.post });
        } catch (error) {
            next(error);
        }
    }

    // 3. 피드 작성
    static async createPost(req, res, next) {
        try {
            const userId = req.currentUserId;

            if (!userId) {
                throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
            }

            const { content, imageUrl } = req.body;

            if (!content || !imageUrl) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const post = await postService.createPost({ userId, content, imageUrl });
            res.status(post.statusCode).send({ message: post.message });
        } catch (error) {
            next(error);
        }
    }

    // 4. 피드 수정
    static async setPost(req, res, next) {
        try {
            const userId = req.currentUserId;

            if (!userId) {
                throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
            }

            const postId = req.params.postId;
            const { content, imageUrl } = req.body;

            if (!postId || !content || !imageUrl) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const toUpdate = { content, imageUrl };
            const post = await postService.setPost({ userId, postId, toUpdate });

            res.status(post.statusCode).send({ message: post.message });
        } catch (error) {
            next(error);
        }
    }

    // 5. 피드 삭제
    static async delPost(req, res, next) {
        try {
            const userId = req.currentUserId;

            if (!userId) {
                throw UnauthorizedError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.');
            }

            const postId = req.params.postId;

            if (!postId) {
                throw BadRequestError('BadRequestError', '요청값을 확인해주세요.');
            }

            const post = await postService.delPost({ userId, postId });

            res.status(post.statusCode).send({ message: post.message });
        } catch (error) {
            next(error);
        }
    }
}

export { postController };
