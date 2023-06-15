import { mysqlDB, User, Post } from '../db/index.js';
import { UnauthorizedError, NotFoundError, InternalServerError } from '../middlewares/errorMiddleware.js';

class postService {
    //1. 전체 피드 시간순
    static async getAllPosts({ userId, cursor }) {
        try {
            await mysqlDB.query('START TRANSACTION');
            let posts = [];

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            if (cursor == 0) {
                posts = await Post.recentPost();
            } else if (cursor == -1) {
                posts = '전체 게시물 조회가 끝났습니다.';
            } else {
                posts = await Post.getAllPosts({ cursor });
            }

            await mysqlDB.query('COMMIT');

            return {
                message: '게시물 전체 조회를 성공했습니다.',
                posts,
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('게시물 전체 조회를 실패했습니다.');
            }
        }
    }

    //2. 피드 상세페이지
    static async getPost({ userId, postId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const checkPost = await Post.findById({ postId });

            if (!checkPost) {
                throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
            }

            const post = await Post.getPost({ postId });

            await mysqlDB.query('COMMIT');

            return {
                message: '게시물 상세 조회를 성공했습니다.',
                post,
            };
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new UnauthorizedError('게시물 상세 조회를 실패했습니다.');
            }
        }
    }

    //3. 피드 작성하기
    static async createPost({ userId, content, imageUrl }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            await Post.create({
                userId,
                content,
                imageUrl,
            });

            await mysqlDB.query('COMMIT');

            return {
                message: '게시물 작성을 성공했습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('게시물 작성을 실패했습니다.');
            }
        }
    }

    //4. 피드 수정하기
    static async setPost({ userId, postId, toUpdate }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const post = await Post.findById({ postId });

            if (!post) {
                throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
            }

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
                message: '게시물 수정을 성공했습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('게시물 수정을 실패했습니다.');
            }
        }
    }

    //5. 피드 삭제하기
    static async delPost({ userId, postId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const post = await Post.findById({ postId });

            if (!post) {
                throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
            }

            await Post.delete({ userId, postId });

            await mysqlDB.query('COMMIT');

            return {
                message: '게시물 삭제를 성공했습니다.',
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('게시물 삭제를 실패했습니다.');
            }
        }
    }

    // 6. 피드 개수와 피드 작성자의 수
    static async getCountPostUser({ userId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const count = await Post.getCount();

            await mysqlDB.query('COMMIT');

            return {
                message: '피드 수와 피드를 작성한 유저 수 불러오기에 성공했습니다.',
                postCount: count.postCount,
                userCount: count.userCount,
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('피드 수와 피드를 작성한 유저 수 불러오기에 실패했습니다.');
            }
        }
    }

    //
    static async getUserByPost({ userId, postUserId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const userPostList = await Post.getUserPost({ postUserId });

            await mysqlDB.query('COMMIT');

            return {
                message: '유저가 작성한 피드 정보 불러오기에 성공했습니다.',
                userPostList,
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('유저가 작성한 피드 정보 불러오기에 실패했습니다.');
            }
        }
    }

    //
    static async getUserByLikePost({ userId, likeUserId }) {
        try {
            await mysqlDB.query('START TRANSACTION');

            const user = await User.findById({ userId });

            if (!user[0]) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const userLikePostList = await Post.getUserLikePost({ likeUserId });

            await mysqlDB.query('COMMIT');

            return {
                message: '유저가 작성한 피드 정보 불러오기에 성공했습니다.',
                userLikePostList,
            };
        } catch (error) {
            await mysqlDB.query('ROLLBACK');

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('유저가 작성한 피드 정보 불러오기에 실패했습니다.');
            }
        }
    }
}

export { postService };
