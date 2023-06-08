import { mysqlDB } from '../index.js';

class Like {
    // 해당 포스트 좋아요 수 가져오기
    static async getLike({ postId }) {
        const query = 'SELECT COUNT(*) AS likeCount FROM post_like WHERE postId = ?';
        const [rows] = await mysqlDB.query(query, [postId]);

        return rows[0];
    }

    //좋아요 눌렀는지(true) 안눌렀는지(false) 확인
    static async isLiked({ userId, postId }) {
        const query = 'SELECT * FROM post_like WHERE postId = ? AND userId = ?';
        const [rows] = await mysqlDB.query(query, [postId, userId]);

        return rows[0].length > 0;
    }

    // 새로운 좋아요 생성
    static async addLike({ userId, postId }) {
        const query = 'INSERT INTO post_like (postId, userId) VALUES (?, ?)';
        await mysqlDB.query(query, [postId, userId]);
    }

    // 좋아요 삭제.
    static async removeLike({ userId, postId }) {
        const query = 'DELETE FROM post_like WHERE postId = ? AND userId = ?';
        await mysqlDB.query(query, [postId, userId]);
    }
}
export { Like };
