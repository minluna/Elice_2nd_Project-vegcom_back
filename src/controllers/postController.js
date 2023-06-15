import { postService } from '../services/postService.js';
import { statusCode } from '../utils/statusCode.js';

class postController {
    // 1. 전체 피드 시간순
    static async getAllposts(req, res, next) {
        try {
            const userId = req.currentUserId;
            const cursor = req.params.cursor;

            const posts = await postService.getAllPosts({ userId, cursor });

            statusCode.setResponseCode200(res);
            res.send({ message: posts.message, postList: posts.posts });
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

            statusCode.setResponseCode200(res);
            res.send({ message: post.message, post: post.post });
        } catch (error) {
            next(error);
        }
    }

    // 3. 피드 작성
    static async createPost(req, res, next) {
        try {
            const userId = req.currentUserId;

            const { content } = req.body;
            const imageUrl = req.file.key;

            const post = await postService.createPost({ userId, content, imageUrl });

            statusCode.setResponseCode201(res);
            res.send({ message: post.message });
        } catch (error) {
            next(error);
        }
    }

    // 4. 피드 수정
    static async setPost(req, res, next) {
        try {
            const userId = req.currentUserId;

            const postId = req.params.postId;
            const { content } = req.body;
            const imageUrl = req.file.key;

            const toUpdate = { content, imageUrl };
            const post = await postService.setPost({ userId, postId, toUpdate });

            statusCode.setResponseCode200(res);
            res.send({ message: post.message });
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

            statusCode.setResponseCode200(res);
            res.send({ message: post.message });
        } catch (error) {
            next(error);
        }
    }

    // 6. 피드 개수와 피드 작성자의 수
    static async getCount(req, res, next) {
        try {
            const userId = req.currentUserId;

            const post = await postService.getCountPostUser({ userId });

            statusCode.setResponseCode200(res);
            res.send({ message: post.message, postCount: post.postCount, userCount: post.userCount });
        } catch (error) {
            next(error);
        }
    }

    // 7. 특정 유저의 피드 불러오기
    static async getUserPost(req, res, next) {
        try {
            const userId = req.currentUserId;
            const postUserId = req.params.userId;

            const postList = await postService.getUserByPost({ userId, postUserId });

            statusCode.setResponseCode200(res);
            res.send({ message: postList.message, userPostList: postList.userPostList });
        } catch (error) {
            next(error);
        }
    }

    // 8. 특정 유저가 좋아요 한 피드 불러오기
    static async getUserLikePost(req, res, next) {
        try {
            const userId = req.currentUserId;
            const likeUserId = req.params.userId;

            const postList = await postService.getUserByLikePost({ userId, likeUserId });

            statusCode.setResponseCode200(res);
            res.send({ message: postList.message, userLikePostList: postList.userLikePostList });
        } catch (error) {
            next(error);
        }
    }
}

export { postController };
