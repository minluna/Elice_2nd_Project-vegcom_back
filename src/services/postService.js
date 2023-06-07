import { User, Post } from '../db/index.js';
import { UnauthorizedError, NotFoundError, InternalServerError } from '../middlewares/errorMiddleware.js';

class postService {
    //1. 전체 피드 시간순
    static async getAllPosts({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
        }

        try {
            const posts = await Post.getAllPosts();

            return {
                statusCode: 200,
                message: '게시물 전체 조회를 성공했습니다.',
                posts,
            };
        } catch (error) {
            throw new UnauthorizedError('게시물 전체 조회를 실패했습니다.');
        }
    }

    //2. 피드 상세페이지
    static async getPost({ userId, postId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
        }

        const post = await Post.findById({ postId });

        if (!post) {
            throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
        }

        try {
            const post = await Post.getPost({ postId });

            return {
                statusCode: 200,
                message: '게시물 상세 조회를 성공했습니다.',
                post,
            };
        } catch (error) {
            throw new UnauthorizedError('게시물 상세 조회를 실패했습니다.');
        }
    }

    //3. 피드 작성하기
    static async createPost({ userId, content, imageUrl }) {
        await mysqlDB.query('START TRANSACTION');

        const user = await User.findById({ userId });

        if (!user) {
            throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
        }

        try {
            await Post.create({
                userId,
                content,
                imageUrl,
            });

            await mysqlDB.query('COMMIT');

            return {
                statusCode: 201,
                message: '게시물 작성을 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('게시물 작성을 실패했습니다.');
        }
    }

    //4. 피드 수정하기
    static async setPost({ userId, postId, toUpdate }) {
        await mysqlDB.query('START TRANSACTION');

        const user = await User.findById({ userId });

        if (!user) {
            throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
        }

        const post = await Post.findById({ postId });

        if (!post) {
            throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
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

            await mysqlDB.query('COMMIT');

            return {
                statusCode: 200,
                message: '게시물 수정을 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('게시물 수정을 실패했습니다.');
        }
    }

    //5. 피드 삭제하기
    static async delPost({ userId, postId }) {
        await mysqlDB.query('START TRANSACTION');

        const user = await User.findById({ userId });

        if (!user) {
            throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
        }

        const post = await Post.findById({ postId });

        if (!post) {
            throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
        }

        try {
            await Post.delete({ postId });

            await mysqlDB.query('COMMIT');

            return {
                statusCode: 200,
                message: '게시물 삭제를 성공했습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');
            throw new InternalServerError('게시물 삭제를 실패했습니다.');
        }
    }
}

export { postService };
