import { mysqlDB } from '../index.js';

class User {
    // 새로운 유저 생성
    static async create({ email, password, nickname, imageUrl }) {
        const createUser = 'INSERT INTO user (email, password, nickname, flag) VALUES (?, ?, ?, "일반")';
        await mysqlDB.query(createUser, [email, password, nickname]);

        const getUserId = 'SELECT id FROM user WHERE email = ? AND nickname = ?';
        const userId = await mysqlDB.query(getUserId, [email, nickname]);

        const createUserImage = 'INSERT INTO user_image (userId, imageUrl) VALUES (?, ?)';
        await mysqlDB.query(createUserImage, [userId[0][0].id, imageUrl]);

        const createUserPoint = 'INSERT INTO point (userId, currentPoint, accuPoint) VALUES (?, 0, 0)';
        await mysqlDB.query(createUserPoint, [userId[0][0].id]);
    }

    // 이메일을 이용하여 유저 검색
    static async findByEmail({ email }) {
        const getUserByEmail = 'SELECT id, password, nickname, description FROM user WHERE email = ? AND deleteAt is null';
        const [rows] = await mysqlDB.query(getUserByEmail, [email]);

        return rows[0];
    }

    // 유저ID를 이용하여 유저 검색
    static async findById({ userId }) {
        const getUserById =
            'SELECT id, email, nickname, user.description, user.createAt, user_image.imageUrl as userImage, point.accuPoint, user.createAt, \
                    (SELECT count(id) FROM post WHERE post.userId = user.id  AND post.deleteAt is NULL) as storyCount \
            FROM user \
            LEFT JOIN user_image \
            ON user.id = user_image.userId \
            LEFT JOIN point \
            ON user.id = point.userId \
            WHERE user.id = ? AND deleteAt is null';

        const [rows1] = await mysqlDB.query(getUserById, [userId]);

        const getUserAccuRank =
            'SELECT AccuRanking \
            FROM ( \
                SELECT \
                    ROW_NUMBER() OVER (ORDER BY point.accuPoint DESC) as AccuRanking, \
                    user.id \
                FROM user \
                LEFT JOIN user_image ON user.id = user_image.userId \
                LEFT JOIN point ON user.id = point.userId \
                WHERE deleteAt IS NULL ) AS rankings \
            WHERE id = ?';
        const [rows2] = await mysqlDB.query(getUserAccuRank, [userId]);

        const getUserTodayRank =
            'SELECT ranking as TodayRanking \
            FROM ( \
                SELECT ROW_NUMBER() OVER (ORDER BY user.storyCount DESC, user.accuPoint DESC) as ranking, id, nickname \
                FROM ( SELECT \
                            user.id, \
                            user.email, \
                            user.nickname, \
                            user.createAt, \
                            user_image.imageUrl, \
                            point.accuPoint, \
                            (SELECT COUNT(id) FROM post WHERE post.userId = user.id and DATE_FORMAT(createAt, "%Y-%m-%d") = CURDATE()) as storyCount \
                        FROM user \
                        LEFT JOIN user_image ON user.id = user_image.userId \
                        LEFT JOIN point ON user.id = point.userId \
                        WHERE deleteAt IS NULL ) AS user ) as ranking \
            WHERE id = ?';
        const [rows3] = await mysqlDB.query(getUserTodayRank, [userId]);

        return [rows1[0], rows2[0], rows3[0]];
    }

    // 유저의 포인트 내역 불러오기
    static async getPoint({ userId }) {
        const getUserPoint =
            'SELECT user.id, \
                    user.nickname, \
                    point.accuPoint \
            FROM user \
            LEFT JOIN point \
            ON user.id = point.userId \
            WHERE user.id = ? AND user.deleteAt is null';
        const [rows] = await mysqlDB.query(getUserPoint, [userId]);

        return rows[0];
    }

    // 전체 유저 수 불러오기
    static async getCount() {
        const getUserCount = 'SELECT COUNT(id) AS userCount FROM user WHERE deleteAt is null';
        const [rows] = await mysqlDB.query(getUserCount);

        return rows[0];
    }

    // 유저 정보 수정(내용, 별명)
    static async update({ userId, fieldToUpdate, newValue, imageUrl }) {
        const updateUserInfo = `UPDATE user SET ${fieldToUpdate} = ? WHERE id = ?`;
        await mysqlDB.query(updateUserInfo, [newValue, userId]);

        const updateUserImage = 'UPDATE user_image SET imageUrl = ? WHERE userId = ?';
        await mysqlDB.query(updateUserImage, [imageUrl, userId]);
    }

    // 유저 정보 삭제
    static async delete({ userId }) {
        const deleteUser = 'UPDATE user SET deleteAt = CURRENT_TIMESTAMP WHERE id = ?';
        const [rows] = await mysqlDB.query(deleteUser, [userId]);

        return rows;
    }
}

export { User };
