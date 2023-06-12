import { mysqlDB } from '../index.js';

class Post {
    //1. 전체 피드 최신순
    static async getAllPosts() {
        const query =
            'SELECT post.id as postId, \
                    post.userId, \
                    user.nickname, \
                    post.content, \
                    post_image.imageUrl, \
                    user_image.imageUrl as userImage \
            FROM post \
            LEFT JOIN post_image \
            ON post.id = post_image.postId \
            LEFT JOIN user \
            ON post.userId = user.id \
            LEFT JOIN user_image \
            ON post.userId = user_image.userId \
            WHERE post.deleteAt is NULL AND user.deleteAt is NULL \
            ORDER BY post.createAt DESC';
        const [rows] = await mysqlDB.query(query);

        return rows;
    }

    //2. 피드 상세페이지
    static async getPost({ postId }) {
        const query =
            'SELECT post.id as postId, \
                    post.userId, \
                    user.nickname, \
                    post.content, \
                    post_image.imageUrl, \
                    user_image.imageUrl as userImage \
            FROM post \
            LEFT JOIN post_image \
            ON post.id = post_image.postId \
            LEFT JOIN user \
            ON post.userId = user.id \
            LEFT JOIN user_image \
            ON post.userId = user_image.userId \
            WHERE post.id = ? AND post.deleteAt is NULL AND user.deleteAt is NULL;';
        const [rows] = await mysqlDB.query(query, [postId]);

        return rows[0];
    }

    //3. 피드 작성하기
    static async create({ userId, content, imageUrl }) {
        const query1 = 'INSERT INTO post (userId, content) VALUES (?, ?)';
        await mysqlDB.query(query1, [userId, content]);

        const query2 = 'INSERT INTO post_image (postId, imageUrl) VALUES (LAST_INSERT_ID(), ?)';
        await mysqlDB.query(query2, [imageUrl]);

        const query3 =
            'UPDATE point \
            SET currentPoint = currentPoint + 100, accuPoint = accuPoint + 100 \
            WHERE userId = 31 AND 3 > (select count(*) from post where userId = 31 and DATE_FORMAT(createAt, "%Y-%m-%d") = CURDATE())';
        await mysqlDB.query(query3, [userId]);
    }

    //4. 피드 수정하기(포스트와 이미지를 나눠서 작성)
    static async update({ postId, fieldToUpdate, newValue }) {
        const query = `UPDATE post SET ${fieldToUpdate} = ? WHERE id = ?`;
        await mysqlDB.query(query, [newValue, postId]);
    }

    static async updatePostImage({ postId, imageUrl }) {
        const query = 'UPDATE post_image SET imageUrl = ? WHERE postId = ?';
        await mysqlDB.query(query, [imageUrl, postId]);
    }

    //5. 피드 삭제하기
    static async delete({ postId }) {
        const query = 'UPDATE post SET deleteAt = CURRENT_TIMESTAMP WHERE id = ?';
        await mysqlDB.query(query, [postId]);
    }

    //6. ID로 피드 검색하기
    static async findById({ postId }) {
        const query = 'SELECT * FROM post WHERE id = ? AND deleteAt is NULL';
        const [rows] = await mysqlDB.query(query, [postId]);

        return rows[0];
    }

    // 7. 피드 개수와 피드 작성자의 수
    static async getCount() {
        const query =
            'SELECT COUNT(*) AS postCount, \
                    COUNT(DISTINCT userId) AS userCount \
            FROM post \
            WHERE DATE_FORMAT(createAt, "%Y-%m-%d") = CURDATE()';
        const [rows] = await mysqlDB.query(query);

        return rows[0];
    }
}

export { Post };
