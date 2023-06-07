import { User, Post } from '../db/index.js';

class postService {
    //1. 전체 피드 시간순
    static async getAllPosts() {
        // 이거 하려면 우선 userId 값을 기본으로 다 넣어야함
        // const user = await User.findById({ userId });

        // if (!user) {
        //     throw new Error('잘못된 또는 만료된 토큰입니다.');
        // }

        try {
            const posts = await Post.getAllPosts();

            return {
                statusCode: 200,
                message: '게시물 전체 조회를 성공했습니다.',
                posts,
            };
        } catch (error) {
            throw new Error('게시물 전체 조회를 실패했습니다.');
        }
    }

    //2. 피드 상세페이지
    static async getPost({ postId }) {
        try {
            const post = await Post.getPost({ postId });

            return {
                post,
                statusCode: 200,
                message: '게시물 상세 조회를 성공했습니다.',
            };
        } catch (error) {
            throw new Error('게시물 상세 조회를 실패했습니다.');
        }
    }

    //3. 피드 작성하기
    static async createPost({ userId, content, imageUrl }) {
        if (!userId || !content || !imageUrl) {
            throw new Error('필수 입력 값이 비어있습니다.');
        }

        try {
            const post = await Post.create({
                userId,
                content,
                imageUrl,
            });

            // mySQL은 조작을 하면? ResultSetHeader 형태로 받아와지기 때문에
            // insertId 값을 이용해서 새로 추가된 id값을 알아내고 그 값을
            // getPost에 넣어서 반환(아래도 동일 작업)
            const postId = post.insertId;
            const createdPost = await Post.getPost({ postId });

            return {
                createdPost,
                statusCode: 201,
                message: '게시물 작성을 성공했습니다.',
            };
        } catch (error) {
            throw new Error('게시물 작성을 실패했습니다.');
        }
    }

    //4. 피드 수정하기
    static async setPost({ postId, toUpdate }) {
        let post = await Post.getPost({ postId });

        if (!post || post.length === 0) {
            throw new Error('게시물 조회를 실패했습니다.');
        }

        try {
            if (toUpdate.content) {
                const fieldToUpdate = 'content';
                const newValue = toUpdate.content;
                post = await Post.update({ postId, fieldToUpdate, newValue });
            }

            if (toUpdate.imageUrl) {
                const { imageUrl } = toUpdate;
                post = await Post.updatePostImage({ postId, imageUrl });
            }

            const updatedPost = await Post.getPost({ postId });

            return {
                updatedPost,
                statusCode: 200,
                message: '게시물 수정을 성공했습니다.',
            };
        } catch (error) {
            throw new Error('게시물 수정을 실패했습니다.');
        }
    }

    //5. 피드 삭제하기
    static async delPost({ postId }) {
        const post = await Post.getPost({ postId });

        if (!post || post.length === 0) {
            throw new Error('게시물 조회를 실패했습니다.');
        }

        try {
            await Post.delete({ postId });

            return {
                statusCode: 200,
                message: '게시물 삭제를 성공했습니다.',
            };
        } catch (error) {
            throw new Error('게시물 삭제를 실패했습니다.');
        }
    }
}

export { postService };
