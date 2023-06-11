import { mysqlDB } from '../index.js';

class Post {
    //1. 전체 피드 최신순
    static async getAllPosts() {
        const getAllPost =
            'SELECT post.id as postId, \
                    post.userId, \
                    user.nickname, \
                    post.content, \
                    post_image.imageUrl, \
                    user_image.imageUrl as userImage, \
                    post.createAt \
            FROM post \
            LEFT JOIN post_image \
            ON post.id = post_image.postId \
            LEFT JOIN user \
            ON post.userId = user.id \
            LEFT JOIN user_image \
            ON post.userId = user_image.userId \
            WHERE post.deleteAt is NULL AND user.deleteAt is NULL \
            ORDER BY post.createAt DESC';
        const [rows] = await mysqlDB.query(getAllPost);

        return rows;
    }

    //2. 피드 상세페이지
    static async getPost({ postId }) {
        const getPost =
            'SELECT post.id as postId, \
                    post.userId, \
                    user.nickname, \
                    post.content, \
                    post_image.imageUrl, \
                    user_image.imageUrl as userImage, \
                    post.createAt \
            FROM post \
            LEFT JOIN post_image \
            ON post.id = post_image.postId \
            LEFT JOIN user \
            ON post.userId = user.id \
            LEFT JOIN user_image \
            ON post.userId = user_image.userId \
            WHERE post.id = ? AND post.deleteAt is NULL AND user.deleteAt is NULL;';
        const [rows] = await mysqlDB.query(getPost, [postId]);

        return rows[0];
    }

    //3. 피드 작성하기
    static async create({ userId, content, imageUrl }) {
        const createPost = 'INSERT INTO post (userId, content) VALUES (?, ?)';
        await mysqlDB.query(createPost, [userId, content]);

        const createPostImage = 'INSERT INTO post_image (postId, imageUrl) VALUES (LAST_INSERT_ID(), ?)';
        await mysqlDB.query(createPostImage, [imageUrl]);

        const grantPoint =
            'UPDATE point \
            SET currentPoint = currentPoint + 100, accuPoint = accuPoint + 100 \
            WHERE userId = 31 AND 3 > (select count(*) from post where userId = 31 and DATE_FORMAT(createAt, "%Y-%m-%d") = CURDATE())';
        await mysqlDB.query(grantPoint, [userId]);
    }

    //4. 피드 수정하기(포스트와 이미지를 나눠서 작성)
    static async update({ postId, fieldToUpdate, newValue }) {
        const updatePost = `UPDATE post SET ${fieldToUpdate} = ? WHERE id = ?`;
        await mysqlDB.query(updatePost, [newValue, postId]);
    }

    static async updatePostImage({ postId, imageUrl }) {
        const updatePostImage = 'UPDATE post_image SET imageUrl = ? WHERE postId = ?';
        await mysqlDB.query(updatePostImage, [imageUrl, postId]);
    }

    //5. 피드 삭제하기
    static async delete({ postId }) {
        const deletePost = 'UPDATE post SET deleteAt = CURRENT_TIMESTAMP WHERE id = ?';
        await mysqlDB.query(deletePost, [postId]);
    }

    //6. ID로 피드 검색하기
    static async findById({ postId }) {
        const getPostById = 'SELECT * FROM post WHERE id = ? AND deleteAt is NULL';
        const [rows] = await mysqlDB.query(getPostById, [postId]);

        return rows[0];
    }

    // 7. 피드 개수와 피드 작성자의 수
    static async getCount() {
        const getPostCountAndPostUserCount =
            'SELECT COUNT(*) AS postCount, \
                    COUNT(DISTINCT userId) AS userCount \
            FROM post \
            WHERE DATE_FORMAT(createAt, "%Y-%m-%d") = CURDATE()';
        const [rows] = await mysqlDB.query(getPostCountAndPostUserCount);

        return rows[0];
    }
}

export { Post };
