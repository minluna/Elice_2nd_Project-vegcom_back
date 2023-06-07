import { postService } from '../services/postService.js';

// error 처리가 안되서?? try-catch문 사용(안하면 app crush남)
// 1. 전체 피드 시간순
async function getAllposts(req, res, next) {
    try {
        const posts = await postService.getAllPosts();

        res.status(posts.statusCode).send(posts);
    } catch (error) {
        next(error);
    }
}

// 2. 피드 상세페이지
async function getPost(req, res, next) {
    try {
        const postId = req.params.postId;
        const post = await postService.getPost({ postId });

        res.status(post.statusCode).send([post.post[0], { message: post.message }]);
    } catch (error) {
        next(error);
    }
}

// 3. 피드 작성
async function createPost(req, res, next) {
    try {
        // const userId = req.currentUserId;
        // 일단 userId와 imageUrl을 body에 담아서 보냄
        const { userId, content, imageUrl } = req.body;

        const post = await postService.createPost({ userId, content, imageUrl });

        res.status(post.statusCode).send([post.createdPost[0], { message: post.message }]);
    } catch (error) {
        next(error);
    }
}

// 4. 피드 수정
async function setPost(req, res, next) {
    try {
        const postId = req.params.postId;
        // 일단 사진 body로 받게 설정
        const { content, imageUrl } = req.body;

        const toUpdate = { content, imageUrl };
        const post = await postService.setPost({ postId, toUpdate });

        res.status(post.statusCode).send([post.updatedPost[0], { message: post.message }]);
    } catch (error) {
        next(error);
    }
}

// 5. 피드 삭제
async function delPost(req, res, next) {
    try {
        const postId = req.params.postId;
        const post = await postService.delPost({ postId });

        res.status(post.statusCode).send({ message: post.message });
    } catch (error) {
        next(error);
    }
}

export { getAllposts, getPost, createPost, setPost, delPost };
