import { postService } from '../services/postService.js';
import { UnauthorizedError, BadRequestError } from '../middlewares/errorMiddleware.js';

class postController {
    // 1. 전체 피드 시간순
    static async getAllposts(req, res, next) {
        try {
            const userId = req.currentUserId;

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
            const postId = req.params.postId;

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

            const { content, imageUrl } = req.body;

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

            const postId = req.params.postId;
            const { content, imageUrl } = req.body;

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
            const postId = req.params.postId;

            const post = await postService.delPost({ userId, postId });

            res.status(post.statusCode).send({ message: post.message });
        } catch (error) {
            next(error);
        }
    }
}

export { postController };
