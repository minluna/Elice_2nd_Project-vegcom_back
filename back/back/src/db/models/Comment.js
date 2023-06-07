import { mysqlDB } from '../index.js';

class Comment {
    // 댓글ID를 이용하여 댓글 검색
    static async findById({ commentId }) {
        const query = 'SELECT id, content FROM comment WHERE id = ? AND deleteAt is null';
        const [rows] = await mysqlDB.query(query, [commentId]);

        return rows[0];
    }

    // 댓글 생성
    static async create({ userId, postId, content, parentId }) {
        const query = 'INSERT INTO comment(userId, postId, content, parentId) VALUES(?, ?, ?, ?)';
        const [rows] = await mysqlDB.query(query, [userId, postId, content, parentId]);

        return rows;
    }

    // 댓글 수정
    static async update({ postId, commentId, content }) {
        const query = 'UPDATE comment SET content = ? WHERE id = ? and postId = ?';
        const [rows] = await mysqlDB.query(query, [content, commentId, postId]);

        return rows;
    }

    // 댓글 삭제
    static async delete({ commentId }) {
        const query = 'UPDATE comment SET deleteYN = "Y", deleteAt = CURRENT_TIMESTAMP WHERE id = ?';
        const [rows] = await mysqlDB.query(query, [commentId]);

        return rows;
    }

    // 전체 댓글 불러오기
    static async select({ postId }) {
        const query =
            'SELECT comment.userId, \
                    user.nickname, \
                    user.userImage, \
                    comment.content \
            FROM comment \
            JOIN user \
            ON comment.userId = user.id \
            WHERE postId = ? AND comment.deleteAt is null AND user.deleteAt is null \
            ORDER BY comment.createAt desc';
        const [rows] = await mysqlDB.query(query, [postId]);

        return rows;
    }
}

export { Comment };
