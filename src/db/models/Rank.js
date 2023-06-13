import { mysqlDB } from '../index.js';

class Rank {
    static async getRankList({ point, date }) {
        const getRankList =
            'SELECT user.id as userId, \
                    user.nickname, \
                    user_image.imageUrl as userImage, \
                    point.accuPoint, \
                    (SELECT count(id) FROM post WHERE post.userId = user.id) as storyCount \
                    FROM user \
                    LEFT JOIN user_image \
                    ON user.id = user_image.userId \
                    LEFT JOIN point \
                    ON user.id = point.userId \
                    WHERE user.deleteAt is null AND point.accuPoint < ? AND user.creatAt < ? \
                    ORDER BY point.accuPoint desc AND user.createAt \
                    LIMIT 10 ';
        const [rows] = await mysqlDB.query(getRankList, [point, date]);

        return rows;
    }

    static async firstRankList() {
        const getRankList =
            'SELECT user.id as userId, \
                    user.nickname, \
                    user_image.imageUrl as userImage, \
                    point.accuPoint, \
                    (SELECT count(id) FROM post WHERE post.userId = user.id) as storyCount \
                    FROM user \
                    LEFT JOIN user_image \
                    ON user.id = user_image.userId \
                    LEFT JOIN point \
                    ON user.id = point.userId \
                    WHERE user.deleteAt is null \
                    ORDER BY point.accuPoint desc AND user.createAt \
                    LIMIT 10 ';
        const [rows] = await mysqlDB.query(getRankList);

        return rows;
    }
}

export { Rank };
