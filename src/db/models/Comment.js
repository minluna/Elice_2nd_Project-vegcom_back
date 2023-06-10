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
    static async select({ postId }) {
        const getAllComenet =
            'SELECT comment.id, \
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
            ORDER BY comment.createAt desc';
        const [rows] = await mysqlDB.query(getAllComenet, [postId]);

        return rows;
    }
}

export { Comment };
