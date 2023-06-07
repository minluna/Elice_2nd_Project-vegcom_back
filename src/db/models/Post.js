import { mysqlDB } from '../index.js';

class Post {
    //1. 전체 피드 최신순
    static async getAllPosts() {
        // const query = 'SELECT post.id as postId, post.userId, post.content, post_image.imageUrl
        // FROM post JOIN post_image ON post.id = post_image.postId
        // WHERE deleteAt IS NULL ORDER BY createAt DESC';
        const query =
            'SELECT post.id as postId, post.userId, post.content, post_image.imageUrl FROM post JOIN post_image ON post.id = post_image.postId WHERE deleteYN = "N" ORDER BY createAt DESC';
        const [rows] = await mysqlDB.query(query);

        return rows;
    }

    //2. 피드 상세페이지
    static async getPost({ postId }) {
        // const query = 'SELECT post.id as postId, post.userId, post.content, post_image.imageUrl
        // FROM post JOIN post_image ON post.id = post_image.postId
        // WHERE post.id = ? AND deleteAt IS NULL'
        const query =
            'SELECT post.id as postId, post.userId, post.content, post_image.imageUrl FROM post JOIN post_image ON post.id = post_image.postId WHERE post.id = ? and deleteYN = "N"';
        const [rows] = await mysqlDB.query(query, [postId]);

        return rows;
    }

    //3. 피드 작성하기
    static async create({ userId, content, imageUrl }) {
        const query1 = 'INSERT INTO post (userId, content) VALUES (?, ?)';
        const query2 = 'INSERT INTO post_image (postId, imageUrl) VALUES (LAST_INSERT_ID(), ?)';

        const [row1] = await mysqlDB.query(query1, [userId, content]);
        await mysqlDB.query(query2, [imageUrl]);
        // postId 값을 얻기 위해서는 row1의 값만 알아도 충분함

        return row1;
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
        // const query = 'UPDATE post SET deleteAt = CURRENT_TIMESTAMP WHERE id = ?';
        const query = 'UPDATE post SET deleteYN = "Y", deleteAt = CURRENT_TIMESTAMP WHERE id = ?';
        await mysqlDB.query(query, [postId]);
    }
}

export { Post };
