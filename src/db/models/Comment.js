import { mysqlDB } from '../index.js';

class Comment {
    // 댓글ID를 이용하여 댓글 검색
    static async findById({ commentId }) {
        const getComment = 'SELECT id, content FROM comment WHERE id = ? AND deleteAt is null';
        const [rows] = await mysqlDB.query(getComment, [commentId]);

        return rows[0];
    }

    // 댓글 생성
    static async create({ userId, postId, content, parentId }) {
        const createComment = 'INSERT INTO comment(userId, postId, content, parentId) VALUES(?, ?, ?, ?)';
        const [rows] = await mysqlDB.query(createComment, [userId, postId, content, parentId]);

        return rows;
    }

    // 댓글 수정
    static async update({ postId, commentId, content }) {
        const updateComment = 'UPDATE comment SET content = ? WHERE id = ? and postId = ?';
        const [rows] = await mysqlDB.query(updateComment, [content, commentId, postId]);

        return rows;
    }

    // 댓글 삭제
    static async delete({ commentId }) {
        const deleteComment = 'UPDATE comment SET deleteAt = CURRENT_TIMESTAMP WHERE id = ?';
        const [rows] = await mysqlDB.query(deleteComment, [commentId]);

        return rows;
    }

    // 전체 댓글 불러오기
    static async select({ postId, cursor }) {
        const getAllComment = `SELECT comment.id, \
            comment.userId, \
            user.nickname, \
            user_image.imageUrl, \
            comment.content \
            FROM comment \
            JOIN user \
            ON comment.userId = user.id \
            LEFT JOIN user_image \
            ON user.id = user_image.userId \
            WHERE comment.postId = ? AND comment.deleteAt is null AND user.deleteAt is null \
            AND comment.id < ? \
            ORDER BY comment.createAt DESC LIMIT 3`;

        const [rows] = await mysqlDB.query(getAllComment, [postId, cursor]);

        return rows;

        // 커서 기반
        // SELECT * FROM article WHERE id < {cursor} ORDER BY comment.createAt DESC LIMIT {len}
        // 마지막 댓글의 id보다 작은 값 len개를 찾아와서 보내주기.
        // client에서 마지막으로 보낸 limit값을 받아와야? 될거 같은데?
    }

    static async zeroComment({ postId }) {
        const getAllComment = `SELECT comment.id, \
        comment.userId, \
        user.nickname, \
        user_image.imageUrl, \
        comment.content \
        FROM comment \
        JOIN user \
        ON comment.userId = user.id \
        LEFT JOIN user_image \
        ON user.id = user_image.userId \
        WHERE comment.postId = ? AND comment.deleteAt is null AND user.deleteAt is null \
        ORDER BY comment.createAt DESC LIMIT 3`;

        const [rows] = await mysqlDB.query(getAllComment, [postId]);

        return rows;
    }
}

export { Comment };
