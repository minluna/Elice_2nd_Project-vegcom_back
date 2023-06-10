import { mysqlDB } from '../index.js';

class User {
    // 새로운 유저 생성
    static async create({ email, password, nickname, imageUrl }) {
        const query1 = 'INSERT INTO user (email, password, nickname, flag) VALUES (?, ?, ?, "일반")';
        await mysqlDB.query(query1, [email, password, nickname]);

        const query2 = 'SELECT id FROM user WHERE email = ? AND nickname = ?';
        const userId = await mysqlDB.query(query2, [email, nickname]);

        const query3 = 'INSERT INTO user_image (userId, imageUrl) VALUES (?, ?)';
        await mysqlDB.query(query3, [userId[0][0].id, imageUrl]);
    }

    // 이메일을 이용하여 유저 검색
    static async findByEmail({ email }) {
        const query = 'SELECT id, password, nickname, description FROM user WHERE email = ? AND deleteAt is null';
        const [rows] = await mysqlDB.query(query, [email]);

        return rows[0];
    }

    // 유저ID를 이용하여 유저 검색
    static async findById({ userId }) {
        const query =
            'SELECT id, email, nickname, user_image.imageUrl as userImage \
                FROM user \
                LEFT JOIN user_image \
                ON user.id = user_image.userId \
                WHERE user.id = ? AND deleteAt is null';
        const [rows] = await mysqlDB.query(query, [userId]);

        return rows[0];
    }

    // 유저의 포인트 내역 불러오기
    static async getPoint({ userId }) {
        const query =
            'SELECT user.id, \
                    user.nickname, \
                    point.accuPoint \
            FROM user \
            LEFT JOIN point \
            ON user.id = point.userId \
            WHERE user.id = ? AND user.deleteAt is null';
        const [rows] = await mysqlDB.query(query, [userId]);

        return rows[0];
    }

    // 전체 유저 수 불러오기
    static async getCount() {
        const query = 'SELECT COUNT(*) AS userCount FROM user WHERE deleteAt is null';
        const [rows] = await mysqlDB.query(query);

        return rows[0];
    }

    // 유저 정보 수정(내용, 별명)
    static async update({ userId, fieldToUpdate, newValue, imageUrl }) {
        const query1 = `UPDATE user SET ${fieldToUpdate} = ? WHERE id = ?`;
        await mysqlDB.query(query1, [newValue, userId]);
        const query2 = 'UPDATE user_image SET imageUrl = ? WHERE userId = ?';
        await mysqlDB.query(query2, [imageUrl, userId]);
    }

    // 유저 정보 삭제
    static async delete({ userId }) {
        const query = 'UPDATE user SET deleteAt = CURRENT_TIMESTAMP WHERE id = ?';
        const [rows] = await mysqlDB.query(query, [userId]);

        return rows;
    }
}

export { User };
