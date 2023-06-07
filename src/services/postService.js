import { User, Post } from '../db/index.js';
import { UnauthorizedError, NotFoundError, InternalServerError } from '../../errors.js';

class postService {
    //1. 전체 피드 시간순
    static async getAllPosts({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        try {
            const posts = await Post.getAllPosts();

            return {
                statusCode: 200,
                message: '게시물 전체 조회를 성공했습니다.',
                posts,
            };
        } catch (error) {
            throw UnauthorizedError('PostListLoadFailedError', '게시물 전체 조회를 실패했습니다.');
        }
    }

    //2. 피드 상세페이지
    static async getPost({ userId, postId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        const post = await Post.findById({ postId });

        if (!post) {
            throw NotFoundError('PostNotFoundId', '요청한 게시물의 정보를 찾을 수 없습니다.');
        }

        try {
            const post = await Post.getPost({ postId });

            return {
                statusCode: 200,
                message: '게시물 상세 조회를 성공했습니다.',
                post,
            };
        } catch (error) {
            throw UnauthorizedError('PostLoadFailedError', '게시물 상세 조회를 실패했습니다.');
        }
    }

    //3. 피드 작성하기
    static async createPost({ userId, content, imageUrl }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        try {
            await Post.create({
                userId,
                content,
                imageUrl,
            });

            return {
                statusCode: 201,
                message: '게시물 작성을 성공했습니다.',
            };
        } catch (error) {
            throw InternalServerError('PostCreateFailedError', '게시물 작성을 실패했습니다.');
        }
    }

    //4. 피드 수정하기
    static async setPost({ userId, postId, toUpdate }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        const post = await Post.findById({ postId });

        if (!post) {
            throw NotFoundError('PostNotFoundId', '요청한 게시물의 정보를 찾을 수 없습니다.');
        }

        try {
            if (toUpdate.content) {
                const fieldToUpdate = 'content';
                const newValue = toUpdate.content;
                await Post.update({ postId, fieldToUpdate, newValue });
            }

            if (toUpdate.imageUrl) {
                const { imageUrl } = toUpdate;
                await Post.updatePostImage({ postId, imageUrl });
            }

            return {
                statusCode: 200,
                message: '게시물 수정을 성공했습니다.',
            };
        } catch (error) {
            throw InternalServerError('PostUpdateFailedError', '게시물 수정을 실패했습니다.');
        }
    }

    //5. 피드 삭제하기
    static async delPost({ userId, postId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw UnauthorizedError('InvalidToken', '잘못된 또는 만료된 토큰입니다.');
        }

        const post = await Post.findById({ postId });

        if (!post) {
            throw NotFoundError('PostNotFoundId', '요청한 게시물의 정보를 찾을 수 없습니다.');
        }

        try {
            await Post.delete({ postId });

            return {
                statusCode: 200,
                message: '게시물 삭제를 성공했습니다.',
            };
        } catch (error) {
            throw InternalServerError('PostDeleteFailedError', '게시물 삭제를 실패했습니다.');
        }
    }
}

export { postService };
